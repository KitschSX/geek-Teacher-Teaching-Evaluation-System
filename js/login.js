document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 发送登录请求到 Apifox 模拟后端
    fetch('http://127.0.0.1:4523/m1/5341581-5012519-default/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
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


