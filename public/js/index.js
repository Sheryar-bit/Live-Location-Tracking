
        let socket;
        let token = localStorage.getItem("token");
        let role = localStorage.getItem("role");

        function register() {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const role = document.getElementById("role").value;
        
            console.log("Sending registration request:", { name, email, password, role });
        
            fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => { throw err; });
                }
                return res.json();
            })
            .then(data => {
                document.getElementById("status").innerText = data.message;
            })
            .catch(error => {
                console.error("Registration error:", error);
                document.getElementById("status").innerText = `Registration failed: ${error.message || error.error || 'Unknown error'}`;
            });
        }

        // function login() {
        //     const email = document.getElementById("email").value;
        //     const password = document.getElementById("password").value;

        //     fetch("http://localhost:5000/login", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ email, password }),
        //     }).then(res => res.json()).then(data => {
        //         if (data.token) {
        //             localStorage.setItem("token", data.token);
        //             localStorage.setItem("role", data.role);
        //             document.getElementById("status").innerText = "Logged in!";
        //             startTracking();
        //         } else {
        //             document.getElementById("status").innerText = "Login failed!";
        //         }
        //     });
        // }

        function login() {
            const name = document.getElementById("name").value;
            const password = document.getElementById("password").value;
          
            fetch("http://localhost:5000/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, password }),
            })
            .then(res => {
              if (!res.ok) {
                return res.json().then(err => { throw err; });
              }
              return res.json();
            })
            .then(data => {
              if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                document.getElementById("status").innerText = "Logged in!";
                startTracking();
              } else {
                document.getElementById("status").innerText = "Login failed!";
              }
            })
            .catch(error => {
              console.error("Login error:", error);
              document.getElementById("status").innerText = `Login failed: ${error.message || error.error || 'Unknown error'}`;
            });
          }
        function startTracking() {
            token = localStorage.getItem("token");
            role = localStorage.getItem("role");

            if (!token) {
                alert("Please log in first.");
                return;
            }

            socket = io("http://localhost:5000", { auth: { token } });

            const map = L.map("map").setView([0, 0], 2);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

            const markers = {};

            if (navigator.geolocation) {
                navigator.geolocation.watchPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    socket.emit("send-location", { latitude, longitude });
                });
            }

            if (role === "admin") {
                socket.on("all-locations", (locations) => {
                    locations.forEach(({ userId, latitude, longitude }) => {
                        if (markers[userId]) {
                            markers[userId].setLatLng([latitude, longitude]);
        
                        } else {
                            markers[userId] = L.marker([latitude, longitude]).addTo(map);
                        }
                    });
                });
            } else {
                socket.on("receive-location", (data) => {
                    const { id, latitude, longitude } = data;
                    if (markers[id]) {
                        markers[id].setLatLng([latitude, longitude]);
                    } else {
                        markers[id] = L.marker([latitude, longitude]).addTo(map);
                    
                    }
                    map.setView([latitude, longitude], 20);
                });
            }
        }
