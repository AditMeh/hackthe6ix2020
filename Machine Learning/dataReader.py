from music21 import converter, chord, note

dataset_name = 'midi'
test_filename = "cs6-1pre.mid"

notes = []
durations = []

original_score = converter.parse(dataset_name + "/" + test_filename).chordify()

stuff = []
for element in original_score:
    if isinstance(element, note.Rest):
        stuff.append(element.name + str(element.duration.quarterLength))
    if isinstance(element, chord.Chord):
        stuff.append('.'.join(n.nameWithOctave for n in element.pitches))
        #print("duration: " + str(element.duration.quarterLength))

print(len(set(stuff)))
for i in set(stuff):
    print(i)


#preprocessing






