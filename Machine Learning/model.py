import tensorflow as tf
from keras.models import Model
from keras.layers import Concatenate, LSTM, Embedding, Dense, Input, Activation, Permute, RepeatVector
from keras.activations import softmax, tanh
from keras.metrics import categorical_crossentropy
from keras.optimizers import RMSprop



notes_in = Input(shape=(None,))
durations_in = Input(shape=(None,))

x1 = Embedding(n_notes, embed_size)(notes_in)
x2 = Embedding(n_durations, embed_size)(durations_in)

x = Concatenate()([x1, x2])

x = LSTM(rnn_units, return_sequences=True)(x)
x = LSTM(rnn_units, return_sequences=True)(x)

e = Dense(1, activation='tanh')(x)
e = Reshape([-1])(e)
alpha = Activation('softmax')(e)

alpha_repeated = Permute([2, 1])(RepeatVector(rnn_units)(alpha))

c = Multiply()([x, alpha_repeated])
c = Lambda(lambda xin: K.sum(xin, axis=1), output_shape=(rnn_units,))(c)

notes_out = Dense(n_notes, activation='softmax', name='pitch')(c)
durations_out = Dense(n_durations, activation='softmax', name='duration')(c)

model = Model([notes_in, durations_in], [notes_out, durations_out])

att_model = Model([notes_in, durations_in], alpha)


opti = RMSprop(lr=0.001)
model.compile(loss=['categorical_crossentropy', 'categorical_crossentropy'], optimizer=opti)
