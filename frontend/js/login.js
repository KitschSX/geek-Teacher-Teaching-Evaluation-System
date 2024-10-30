document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (!response.ok) {
                // 如果响应状态不是 200，抛出错误
                throw new Error('登录失败');
            }
            return response.json(); // 解析 JSON
        })
        .then(data => {
            // 登录成功后处理逻辑
            localStorage.setItem('jwtToken', data.token); // 将 JWT 存入本地存储
            if (data.role === 'admin') {
                window.location.href = 'admin.html'; // 跳转到管理员页面
            } else if (data.role === 'student') {
                window.location.href = 'student.html'; // 跳转到学生页面
            }
        })
        .catch(error => {
            // 错误处理
            console.error('登录请求失败:', error);
            document.getElementById('errorMsg').textContent = error.message; // 显示错误信息
        });
});
