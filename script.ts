
document.getElementById("resumeForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Get references to form elements using their IDs
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLTextAreaElement;
    const experienceElement = document.getElementById("experience") as HTMLTextAreaElement;
    const skillsElement = document.getElementById("skills") as HTMLTextAreaElement;
    const usernameElement = document.getElementById("username") as HTMLInputElement;
  
    // Check if all form elements are present
    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const username = usernameElement.value;
  
        // Generate unique path for saving the resume
        const uniquePath = `resumes/${username.replace(/\s+/g, "__")}_cv.html`;
  
        // Picture element
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
  
        // Create resume output
        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""}
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
        `;
  
        // Display the resume in the output container
        const resumeOutputElement = document.getElementById("resumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.classList.remove("hidden");
  
            // Create container for buttons
            const buttonsContainer = document.createElement("div");
            buttonsContainer.id = "buttonsContainer";
            resumeOutputElement.appendChild(buttonsContainer);
  
            // Add Download PDF Button
            const downloadButton = document.createElement("button");
            downloadButton.textContent = "Download As PDF";
            downloadButton.addEventListener("click", () => {
                window.print(); // Open the print dialog, allowing the user to save as PDF
            });
            buttonsContainer.appendChild(downloadButton);
  
            // Add Shareable Link Button
            const shareLinkButton = document.createElement("button");
            shareLinkButton.textContent = "Copy Shareable Link";
            shareLinkButton.addEventListener("click", async () => {
                try {
                    // Create a unique shareable link
                    const shareableLink = `https://yourdomain.com/resumes/${username.replace(/\s+/g, "__")}_cv.html`;
  
                    // Use Clipboard API to copy the shareable link
                    await navigator.clipboard.writeText(shareableLink);
                    alert("Shareable link copied to clipboard!");
                } catch (err) {
                    console.error("Failed to copy link to clipboard. Please try again.");
                }
            });
            buttonsContainer.appendChild(shareLinkButton);
        } else {
            console.error("Resume output container not found");
        }
    } else {
        console.error("One or more form elements are missing");
    }
});
