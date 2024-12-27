const formatResponse = (data, message = 'Operation successful') => {
    return {
      success: true,
      message,
      data,
    };
  };
  
  module.exports = { formatResponse };
  