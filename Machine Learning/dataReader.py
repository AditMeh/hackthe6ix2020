from music21 import converter, chord, note
import os
import pickle

FILEPATH = 'piano'


def process_Chords(arr, note_dict, dur_dict):
    answer_notes = []
    answer_durations = []
    print("processing midi")
    for element in arr:
        if isinstance(element, chord.Chord):
            answer_notes.append(note_dict['.'.join(n.nameWithOctave for n in element.pitches)])
            answer_durations.append(dur_dict[element.duration.quarterLength])
        if isinstance(element, note.Rest):
            answer_notes.append(note_dict[element.name])
            answer_durations.append(dur_dict[element.duration.quarterLength])
    print("notes size: " + str(len(answer_notes)))
    print("durations size: " + str(len(answer_durations)))

    return answer_notes, answer_durations


def prepare_dicts(dataset_name):
    print("generating dicts")
    notes = []
    durations = []
    for filename in os.listdir(dataset_name):
        print(filename)
        original_score = converter.parse(dataset_name + "/" + filename).chordify()
        for element in original_score:
            if isinstance(element, note.Rest):
                notes.append(element.name)
                durations.append(element.duration.quarterLength)
            if isinstance(element, chord.Chord):
                notes.append('.'.join(n.nameWithOctave for n in element.pitches))
                durations.append(element.duration.quarterLength)

    durations_dict = {}
    notes_dict = {}

    combinations_notes = list(set(notes))
    unique_durations = list(set(durations))
    for i in range(len(combinations_notes)):
        notes_dict[combinations_notes[i]] = i
    for z in range(len(unique_durations)):
        durations_dict[unique_durations[z]] = z

    print("done!")
    print("note_dict size: " + str(len(notes_dict)))
    print("durations_dict size: " + str(len(durations_dict)))

    return notes_dict, durations_dict

def oneHotEncode(num, size):
    temp = [0 for i in range(size)]
    temp[num] = 1
    return temp

input_notes = []
input_duration = []

output_notes = []
output_duration = []

notes_dict, durations_dict = prepare_dicts(FILEPATH)
for filename in os.listdir(FILEPATH):
    print("now generating formatted dataset")
    original_score = converter.parse(FILEPATH + "/" + filename).chordify()
    print(filename)
    notes, durations = process_Chords(original_score, notes_dict, durations_dict)
    print(max(notes))
    print(max(durations))
    l = 0
    r = 32
    while r != len(notes) - 1:
        input_notes.append(notes[l:r+1])
        input_duration.append(durations[l:r+1])
        output_notes.append(oneHotEncode(notes[r+1], len(notes_dict)))
        output_duration.append(oneHotEncode(durations[r+1], len(durations_dict)))
        l += 1
        r += 1


pickle_notes_dict = open(FILEPATH + " notes_dict.pickle","wb")
pickle.dump(notes_dict, pickle_notes_dict)
pickle_notes_dict.close()

pickle_durations_dict = open(FILEPATH + " durations_dict.pickle","wb")
pickle.dump(durations_dict, pickle_durations_dict)
pickle_durations_dict.close()


pickle_input_notes = open(FILEPATH + " input_notes.pickle","wb")
pickle.dump(input_notes, pickle_input_notes)
pickle_input_notes.close()

pickle_input_duration = open(FILEPATH + " input_duration.pickle","wb")
pickle.dump(input_duration, pickle_input_duration)
pickle_input_duration.close()

pickle_output_notes = open(FILEPATH + " output_notes.pickle","wb")
pickle.dump(output_notes, pickle_output_notes)
pickle_output_notes.close()

pickle_output_duration = open(FILEPATH + " output_duration.pickle","wb")
pickle.dump(output_duration, pickle_output_duration)
pickle_output_duration.close()





