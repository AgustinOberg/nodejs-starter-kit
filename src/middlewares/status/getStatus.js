export const getStatus = (req, res, next) => {
  const { from } = req.body;
  req.status = {
    ok: true,
    from,
  };
  return next();
};
