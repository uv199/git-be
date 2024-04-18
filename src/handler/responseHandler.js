const msg = "API give response Successfully";
export const handleResponse = (data, res, message = msg) => {
  const formattedData = {
    success: true,
    data,
    message,
  };

  return res.status(200).json(formattedData);
};
