document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobilné Hamburger Menu
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 2. Modálne okno (Pop-up nového incidentu)
  const modal = document.getElementById('incidentModal');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const form = document.getElementById('incidentForm');
  const tableBody = document.getElementById('incidentTableBody');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });

    const closeModal = () => {
      modal.classList.remove('active');
      if (form) form.reset();
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Pridanie nového riadku po odoslaní formulára
    if (form && tableBody) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const shipmentCode = document.getElementById('shipmentCode').value;
        const priority = document.getElementById('issueType').value;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td><strong>#${Math.floor(1000 + Math.random() * 9000)}</strong></td>
          <td>${shipmentCode}</td>
          <td><span class="badge ${priority === 'Kritické' ? 'badge-critical' : 'badge-pending'}">${priority}</span></td>
          <td><span class="sla-timer ${priority === 'Kritické' ? 'critical' : 'warning'}">⏱ Nový (30 min)</span></td>
          <td><button class="btn-sm">Detail</button></td>
        `;

        tableBody.prepend(newRow);
        closeModal();
      });
    }
  }
});