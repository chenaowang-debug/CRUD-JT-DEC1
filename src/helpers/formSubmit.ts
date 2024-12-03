const formSubmit = async (formData: object): Promise<Response> => {
  const response = await fetch('/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return response;
};

export default formSubmit;
