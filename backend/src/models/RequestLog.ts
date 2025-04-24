import mongoose from 'mongoose';

const requestLogSchema = new mongoose.Schema({
  endpoint: { type: String, required: true }, // e.g. '/openai'
  model: { type: String, required: true }, // e.g. 'gpt-3.5-turbo'
  request: { type: mongoose.Schema.Types.Mixed, required: true },
  response: { type: mongoose.Schema.Types.Mixed },
  status: { type: Number }, // e.g. 200, 500
  createdAt: { type: Date, default: Date.now },
});

export const RequestLog = mongoose.model('RequestLog', requestLogSchema);
