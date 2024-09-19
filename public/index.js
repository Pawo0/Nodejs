const loginForm = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")

if (loginForm) loginForm.addEventListener("submit", sendForm)
if (registerForm) registerForm.addEventListener("submit", sendForm)


async function sendForm (event) {
    event.preventDefault();

    let name = document.getElementById("name");
    if (name) name = name.value;
    else name = ''
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorDiv = document.getElementById("error");

    try {
        const response = await fetch(`/user/${this.dataset.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email" : email, "password" : password, "name" : name })
        });

        const result = await response.json();
        console.log(response.ok)
        if (response.ok) {
            let headers = new Headers({
                "Authorization" : `Bearer ${document.cookie}`
            })
            console.log(headers)
            window.location.href = "/";
        } else {
            errorDiv.textContent = result.message;
            if (this.dataset.id === 'register'){
                showNotification('Invalid format')
            }else showNotification('Invalid email or password');
        }
    } catch (error) {
        errorDiv.textContent = `Wystąpił błąd serwera, spróbuj ponownie później. ${error}`;
    }
}


function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // 3 sekundy
}