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
import numpy as np
import os
import numpy as np
import pickle
import matplotlib.pyplot as plt


def pickle_to_array(filename):
    pkl_array = open("pickles/" + filename + ".pickle", 'rb')
    array = pickle.load(pkl_array)
    array = np.array(array)
    return array


train_X_notes = pickle_to_array("input_notes")[0:10000]
train_X_durations = pickle_to_array("input_duration")[0:10000]

train_y_notes = pickle_to_array("output_notes")[0:10000]
train_y_durations = pickle_to_array("output_duration")[0:10000]
print(train_X_notes.shape)
print(train_X_durations.shape)
print(train_y_notes.shape)
print(train_y_durations.shape)

notes_in = Input(shape=(None,))
durations_in = Input(shape=(None,))

x1 = Embedding(train_y_notes.shape[1], 100)(notes_in)
x2 = Embedding(train_y_durations.shape[1], 100)(durations_in)

x = Concatenate()([x1, x2])
x = LSTM(512, return_sequences=True)(x)

x = LSTM(512, return_sequences=True)(x)

e = Dense(1, activation='tanh')(x)
e = Reshape([-1])(e)
alpha = Activation('softmax')(e)

alpha_repeated = Permute([2, 1])(RepeatVector(rnn_units)(alpha))

c = Multiply()([x, alpha_repeated])
c = Lambda(lambda xin: K.sum(xin, axis=1), output_shape=(rnn_units,))(c)

notes_out = Dense(n_notes, activation='softmax', name='pitch')(c)
durations_out = Dense(n_durations, activation='softmax', name='duration')(c)

model = Model([notes_in, durations_in], [notes_out, durations_out])

notes_out = Dense(train_y_notes.shape[1], activation='softmax', name='pitch')(c)
durations_out = Dense(train_y_durations.shape[1], activation='softmax', name='duration')(c)

model = Model([notes_in, durations_in], [notes_out, durations_out])

opti = RMSprop(lr=0.001)
model.compile(loss=['categorical_crossentropy', 'categorical_crossentropy'], optimizer=opti)

print(model.output_shape)
model.summary()

checkpoint_cb = ModelCheckpoint(
    "Gen_model.h5",
    monitor = "val_loss",
    save_best_only="true",
)

early_stopping = EarlyStopping(
    monitor='val_loss'
    , restore_best_weights=True
    , patience=10
)

callbacks_list = [
    checkpoint_cb,
    early_stopping
]
history = model.fit([train_X_notes, train_X_durations], [train_y_notes, train_y_durations]
                    , epochs=2000000, batch_size=31
                    , validation_split=0.2
                    , callbacks=callbacks_list
                    , shuffle=True
                    )

print(history.history.keys())
plt.plot(history.history['val_duration_loss'])
plt.plot(history.history['val_pitch_loss'])
plt.title('val_duration_loss')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.legend(['val_duration_loss', 'val_pitch_loss'], loc='upper left')
plt.show()
# summarize history for loss
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('model loss')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.legend(['loss', 'val_loss'], loc='upper left')
plt.show()
