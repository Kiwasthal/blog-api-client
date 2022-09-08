const login = async router => {
  const formData = JSON.stringify(data);
  try {
    const request = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await request.json();
    if (request.status === 200) {
      await updateUserAuth(true);
      localStorage.setItem('token', result.token);
      localStorage.setItem('userAuth', true);
      localStorage.setItem('username', result.body.username);
      localStorage.setItem('id', result.body._id);
    } else {
      error(result.info.message);
      log(true);
    }
    if (redirect) router.push('/');
  } catch (err) {
    console.log(err);
  }
};
