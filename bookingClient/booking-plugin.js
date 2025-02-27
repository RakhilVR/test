document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const dateInput = document.getElementById("date");
    const slotsContainer = document.getElementById("slots");
    const submitBtn = document.getElementById("submitBtn");

    let selectedSlot = null;

    // API URL (Adjust to match your backend)
    const API_URL = "http://localhost:3000/api";

    const today = new Date().toISOString().split("T")[0]; 
    dateInput.setAttribute("min", today); 

    dateInput.addEventListener("change", async () => {
        slotsContainer.innerHTML = "<p>Loading slots...</p>";
        selectedSlot = null;
        submitBtn.disabled = true;

        const date = dateInput.value;
        if (!date) return;

        try {
            const response = await fetch(`${API_URL}/slots?date=${date}`);
            const data = await response.json();
            slotsContainer.innerHTML = "";

            if (data.data.length === 0) {
                slotsContainer.innerHTML = "<p>No available slots</p>";
                return;
            }

            data.data.forEach(slot => {
                const slotBtn = document.createElement("button");
                slotBtn.textContent = slot;
                slotBtn.classList.add("slot");

                slotBtn.addEventListener("click", () => {
                    document.querySelectorAll(".slot").forEach(btn => btn.classList.remove("selected"));
                    slotBtn.classList.add("selected");
                    selectedSlot = slot;
                    submitBtn.disabled = false;
                });

                slotsContainer.appendChild(slotBtn);
            });

        } catch (error) {
            console.error("Error fetching slots:", error);
            slotsContainer.innerHTML = "<p>Error loading slots</p>";
        }
    });

    // Handle Appointment Booking
    submitBtn.addEventListener("click", async () => {
        if (!nameInput.value || !phoneInput.value || !dateInput.value || !selectedSlot) {
            alert("Please fill in all details.");
            return;
        }

        const appointment = {
            name: nameInput.value,
            phone: phoneInput.value,
            date: dateInput.value,
            time: selectedSlot
        };

        try {
            const response = await fetch(`${API_URL}/book`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointment)
            });

            const data = await response.json();
            alert(data.message);

            if (response.ok) {
                dateInput.dispatchEvent(new Event("change")); 
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Error booking appointment.");
        }
    });
});
