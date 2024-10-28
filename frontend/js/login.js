document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.code === '200') {
                localStorage.setItem('jwtToken', data.token);
                if (data.role === 'admin') {
                    window.location.href = 'admin.html';
                } else if (data.role === 'student') {
                    window.location.href = 'student.html';
                }
            } else {
                document.getElementById('errorMsg').textContent = '用户名或密码错误';
            }
        })
        .catch(error => {
            console.error('登录请求失败:', error);
            document.getElementById('errorMsg').textContent = '请求失败，请稍后重试。';
        });
});
//todo 用户名称密码格式校验 & 转译


