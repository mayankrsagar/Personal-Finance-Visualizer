export const validateWithJoi = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};