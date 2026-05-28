const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            role: "USER"
        };

        try {
            const response = await fetch(`${BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                document.getElementById("message").innerText = "Registration Successful";

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);
            } else {
                document.getElementById("message").innerText = "Registration Failed";
            }

        } catch (error) {
            console.log(error);
        }
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
                                      e.preventDefault();

                                      const data = {
                                          email: document.getElementById("loginEmail").value,
                                          password: document.getElementById("loginPassword").value
                                      };

                                      try {
                                          const response = await fetch(`${BASE_URL}/api/auth/login`, {
                                              method: "POST",
                                              headers: {
                                                  "Content-Type": "application/json"
                                              },
                                              body: JSON.stringify(data)
                                          });

                                          const result = await response.json();

                                          if (response.ok) {

                                              localStorage.setItem("token", result.token);
                                              localStorage.setItem("userId", result.user.id);

                                              document.getElementById("loginMessage").innerText = "Login Success";

                                              setTimeout(() => {
                                                  window.location.href = "dashboard.html";
                                              }, 1000);

                                          } else {
                                              document.getElementById("loginMessage").innerText = "Invalid Credentials";
                                          }

                                      } catch (error) {
                                          console.log(error);
                                      }
                                  });
                              }