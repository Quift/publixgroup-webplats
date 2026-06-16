document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-netlify="true"]').forEach(form => {
    // Netlify adds a hidden 'form-name' input automatically to the HTML, but if we do AJAX,
    // we must ensure it is present in the payload. If it's not in the DOM, append it.
    if (!form.querySelector('input[name="form-name"]')) {
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = 'form-name';
      hiddenInput.value = form.getAttribute('name');
      form.appendChild(hiddenInput);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const searchParams = new URLSearchParams();
      for (const pair of formData) {
        searchParams.append(pair[0], pair[1]);
      }
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
      }
      
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: searchParams.toString()
      })
      .then(() => {
        const successMsg = form.dataset.successMsg;
        const successAction = form.dataset.successAction;
        
        if (successAction === 'replace') {
           form.innerHTML = successMsg || 'Thank you!';
        } else if (successAction === 'alert') {
           if (successMsg) alert(successMsg);
           form.reset();
           if (submitBtn) {
             submitBtn.innerHTML = originalText;
             submitBtn.disabled = false;
           }
        } else {
           form.innerHTML = '<div style="text-align:center; padding: 2rem;"><h3>Thank you!</h3><p>Your message has been sent successfully.</p></div>';
        }
      })
      .catch((error) => {
        alert('There was an error submitting the form: ' + error);
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      });
    });
  });
});
