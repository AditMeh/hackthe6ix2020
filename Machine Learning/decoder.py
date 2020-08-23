from music21 import converter, chord, note, stream, duration, instrument
import pickle
import numpy as np
import tensorflow as tf
from keras.models import Model
from keras.layers import Concatenate, LSTM, Embedding, Dense, Input, Activation, Permute, RepeatVector, Reshape, \
    Multiply, Lambda, Dropout
from keras.utils.vis_utils import plot_model
from keras.activations import softmax, tanh
from keras.callbacks import ModelCheckpoint, EarlyStopping
from keras.utils import plot_model
from keras.metrics import categorical_crossentropy
from keras.optimizers import RMSprop
import keras.backend as K
import tensorflow
attention = True

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


def process_output(prediction_note, prediction_duration):
    if "." in prediction_note:
        notes_in_chord = prediction_note.split(".")
        chord_notes = []
        for item in notes_in_chord:
            new_note = note.Note(item)
            new_note.duration.quarterLength = prediction_duration
            new_note.storedInstrument = instrument.Violoncello()
            chord_notes.append(new_note)
        new_chord = chord.Chord(chord_notes)
        return new_chord
    elif prediction_note == "rest":
        new_note = note.Rest()
        new_note.duration.quarterLength = prediction_duration
        new_note.storedInstrument = instrument.Violoncello()
        return new_note
    elif len(prediction_note) <= 3:
        new_note = note.Note(prediction_note)
        new_note.duration.quarterLength = prediction_duration
        new_note.storedInstrument = instrument.Violoncello()
        return new_note


pkl_array = open("pickles/" + "durations_dict" + ".pickle", 'rb')
durations_dict = pickle.load(pkl_array)
durations_dict_reverse = {v: k for k, v in durations_dict.items()}

pkl_array = open("pickles/" + "notes_dict" + ".pickle", 'rb')
notes_dict = pickle.load(pkl_array)
notes_dict_reverse = {v: k for k, v in notes_dict.items()}

if attention:
    notes_in = Input(shape=(None,))
    durations_in = Input(shape=(None,))

    x1 = Embedding(len(notes_dict), 120)(notes_in)
    x2 = Embedding(len(durations_dict), 120)(durations_in)

    x = Concatenate()([x1, x2])
    x = LSTM(512, return_sequences=True)(x)

    x = LSTM(256, return_sequences=True)(x)

    e = Dense(1, activation='tanh')(x)
    e = Reshape([-1])(e)
    alpha = Activation('softmax')(e)

    alpha_repeated = Permute([2, 1])(RepeatVector(256)(alpha))

    c = Multiply()([x, alpha_repeated])
    c = Lambda(lambda xin: K.sum(xin, axis=1), output_shape=(256,))(c)

    notes_out = Dense(len(notes_dict), activation='softmax', name='pitch')(c)
    durations_out = Dense(len(durations_dict), activation='softmax', name='duration')(c)

    model = Model([notes_in, durations_in], [notes_out, durations_out])
    model.load_weights("Gen_model_weights.h5")

elif not attention:
    notes_in = Input(shape=(None,))
    durations_in = Input(shape=(None,))

    x1 = Embedding(len(notes_dict), 120)(notes_in)
    x2 = Embedding(len(durations_dict), 120)(durations_in)

    x = Concatenate()([x1, x2])
    x = LSTM(
        512,
        return_sequences=True
    )(x)

    x = Dropout(0.3)(x)
    x = LSTM(512, return_sequences=True)(x)
    x = Dropout(0.3)(x)
    c = LSTM(512)(x)
    c = Dense(256)(c)
    c = Dropout(0.3)(c)
    notes_out = Dense(len(notes_dict), activation='softmax', name='pitch')(c)
    durations_out = Dense(len(durations_dict), activation='softmax', name='duration')(c)
    model = Model([notes_in, durations_in], [notes_out, durations_out])
    model.load_weights("Gen_model_best_weights.h5")

original_score = converter.parse("midi" + "/" + "cs2-1pre.mid").chordify()
subset = original_score[0:35]
notes, durations = process_Chords(subset, notes_dict, durations_dict)



print(len(notes))
midi_stream = stream.Stream()
midi_stream.append(subset)

for i in range(200):
    subset_notes = notes[len(notes) - 29: len(notes) - 1]
    subset_durations = durations[len(durations) - 29: len(durations) - 1]
    feed_notes = np.array(subset_notes).reshape((1, len(subset_notes)))
    feed_duration = np.array(subset_durations).reshape((1, len(subset_durations)))

    prediction = model.predict([feed_notes, feed_duration])

    notes.append(np.argmax(prediction[0]))
    durations.append(np.argmax(prediction[1]))
    prediction_note = notes_dict_reverse[np.argmax(prediction[0])]
    prediction_duration = durations_dict_reverse[np.argmax(prediction[1])]
    print(process_output(prediction_note, prediction_duration))

    midi_stream.append(process_output(prediction_note, prediction_duration))


midi_stream = midi_stream.chordify()

midi_stream.write('xml', "test.xml")
