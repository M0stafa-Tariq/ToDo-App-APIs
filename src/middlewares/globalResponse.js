//====================send json response after controller file====================/ /
export const globalResponse = (err, req, res, next) => {
  if (err) {
    console.log(err);
    return res.status(err["cause"] || 500).json({
      success:false,
      errMsg: err.message,
      location:err.stack
    });
  }
};
