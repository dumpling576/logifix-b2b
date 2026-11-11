document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const modal = document.getElementById('incidentModal');
  const detailModal = document.getElementById('detailModal');
  const deleteConfirmModal = document.getElementById('deleteConfirmModal');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const closeDetailBtn = document.getElementById('closeDetailBtn');
  const editBtn = document.getElementById('editIncidentBtn');
  const deleteBtn = document.getElementById('deleteIncidentBtn');
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const deleteConfirmMessage = document.getElementById('deleteConfirmMessage');
  const form = document.getElementById('incidentForm');
  const shipmentInput = document.getElementById('shipmentCode');
  const priorityInput = document.getElementById('issueType');
  const descriptionInput = document.getElementById('description');
  const tableBody = document.getElementById('incidentTableBody');
  const detailFields = {
    id: document.getElementById('detailId'),
    shipment: document.getElementById('detailShipment'),
    priority: document.getElementById('detailPriority'),
    timer: document.getElementById('detailTimer'),
    description: document.getElementById('detailDescription')
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  if (!modal || !detailModal || !form || !tableBody || !shipmentInput || !priorityInput || !descriptionInput) {
    return;
  }

  const incidents = [
    {
      id: 2091,
      shipment: 'LogiExpress s.r.o.',
      priority: 'Kritické',
      deadline: Date.now() + 132000,
      description: 'Poškodená zásielka nahlásená pri doručení.'
    },
    {
      id: 2092,
      shipment: 'TransSk a.s.',
      priority: 'Čakajúce',
      deadline: Date.now() + 28 * 60 * 1000,
      description: 'Meškanie doručenia – čaká sa na potvrdenie nového termínu.'
    }
  ];
  let nextId = 2093;
  let selectedIncidentId = null;
  let editingIncidentId = null;

  const priorityClass = (priority) => priority === 'Kritické' ? 'critical' : 'pending';
  const timerClass = (priority) => priority === 'Kritické' ? 'critical' : 'warning';
  const formatRemainingTime = (deadline) => {
    const remainingSeconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    const twoDigits = (value) => String(value).padStart(2, '0');
    return {
      expired: remainingSeconds === 0,
      text: hours > 0
        ? `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`
        : `${twoDigits(minutes)}:${twoDigits(seconds)}`
    };
  };

  const updateTimers = () => {
    incidents.forEach((incident) => {
      const timer = tableBody.querySelector(`[data-timer-id="${incident.id}"]`);
      const remaining = formatRemainingTime(incident.deadline);
      if (timer) {
        timer.textContent = remaining.expired
          ? `⏱ Po SLA · ${remaining.text}`
          : `⏱ ${remaining.text}`;
        timer.classList.toggle('overdue', remaining.expired);
      }

      if (selectedIncidentId === incident.id) {
        detailFields.timer.textContent = remaining.expired
          ? `Po SLA · ${remaining.text}`
          : remaining.text;
      }
    });
  };

  const renderIncidents = () => {
    tableBody.replaceChildren();

    incidents.forEach((incident) => {
      const row = document.createElement('tr');
      row.classList.add(priorityClass(incident.priority) === 'critical' ? 'row-critical' : 'row-pending');

      const idCell = document.createElement('td');
      const idLabel = document.createElement('strong');
      idLabel.textContent = `#${incident.id}`;
      idCell.append(idLabel);

      const shipmentCell = document.createElement('td');
      shipmentCell.textContent = incident.shipment;

      const priorityCell = document.createElement('td');
      const badge = document.createElement('span');
      badge.className = `badge ${incident.priority === 'Kritické' ? 'badge-critical' : 'badge-pending'}`;
      badge.textContent = incident.priority;
      priorityCell.append(badge);

      const timerCell = document.createElement('td');
      const timer = document.createElement('span');
      timer.className = `sla-timer ${timerClass(incident.priority)}`;
      timer.dataset.timerId = String(incident.id);
      timerCell.append(timer);

      const actionCell = document.createElement('td');
      const detailButton = document.createElement('button');
      detailButton.type = 'button';
      detailButton.className = 'btn-sm';
      detailButton.dataset.incidentId = String(incident.id);
      detailButton.textContent = 'Detail';
      actionCell.append(detailButton);

      row.append(idCell, shipmentCell, priorityCell, timerCell, actionCell);
      tableBody.append(row);
    });
    updateTimers();
  };

  const closeIncidentModal = () => {
    modal.classList.remove('active');
    form.reset();
    editingIncidentId = null;
    const title = modal.querySelector('.modal-header h3');
    const submitButton = form.querySelector('button[type="submit"]');
    if (title) title.textContent = 'Nahlásiť nový incident (Modal)';
    if (submitButton) submitButton.textContent = 'Vytvoriť incident';
  };

  const closeDetailModal = () => {
    detailModal.classList.remove('active');
    detailModal.setAttribute('aria-hidden', 'true');
    selectedIncidentId = null;
  };

  const showIncidentDetails = (incident) => {
    selectedIncidentId = incident.id;
    detailFields.id.textContent = `#${incident.id}`;
    detailFields.shipment.textContent = incident.shipment;
    detailFields.priority.textContent = incident.priority;
    detailFields.description.textContent = incident.description;
    detailModal.classList.add('active');
    detailModal.setAttribute('aria-hidden', 'false');
    updateTimers();
  };

  const startEditingIncident = (incident) => {
    editingIncidentId = incident.id;
    shipmentInput.value = incident.shipment;
    priorityInput.value = incident.priority;
    descriptionInput.value = incident.description;
    const title = modal.querySelector('.modal-header h3');
    const submitButton = form.querySelector('button[type="submit"]');
    if (title) title.textContent = `Upraviť incident #${incident.id}`;
    if (submitButton) submitButton.textContent = 'Uložiť zmeny';
    closeDetailModal();
    modal.classList.add('active');
  };

  openBtn?.addEventListener('click', () => {
    editingIncidentId = null;
    form.reset();
    const title = modal.querySelector('.modal-header h3');
    const submitButton = form.querySelector('button[type="submit"]');
    if (title) title.textContent = 'Nahlásiť nový incident (Modal)';
    if (submitButton) submitButton.textContent = 'Vytvoriť incident';
    modal.classList.add('active');
  });
  closeBtn?.addEventListener('click', closeIncidentModal);
  cancelBtn?.addEventListener('click', closeIncidentModal);
  closeDetailBtn?.addEventListener('click', closeDetailModal);

  tableBody.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest('button[data-incident-id]');
    if (!button) return;
    const incidentId = Number(button.getAttribute('data-incident-id'));
    const incident = incidents.find((item) => item.id === incidentId);
    if (incident) showIncidentDetails(incident);
  });

  editBtn?.addEventListener('click', () => {
    const incident = incidents.find((item) => item.id === selectedIncidentId);
    if (incident) startEditingIncident(incident);
  });

  const closeDeleteConfirmation = () => {
    deleteConfirmModal.classList.remove('active');
    deleteConfirmModal.setAttribute('aria-hidden', 'true');
  };

  deleteBtn?.addEventListener('click', () => {
    const incident = incidents.find((item) => item.id === selectedIncidentId);
    if (!incident || !deleteConfirmModal) return;
    deleteConfirmMessage.textContent = `Naozaj chcete natrvalo odstrániť incident #${incident.id} (${incident.shipment})? Túto akciu nie je možné vrátiť späť.`;
    deleteConfirmModal.classList.add('active');
    deleteConfirmModal.setAttribute('aria-hidden', 'false');
    cancelDeleteBtn?.focus();
  });

  cancelDeleteBtn?.addEventListener('click', closeDeleteConfirmation);

  confirmDeleteBtn?.addEventListener('click', () => {
    const incidentIndex = incidents.findIndex((item) => item.id === selectedIncidentId);
    if (incidentIndex === -1) {
      closeDeleteConfirmation();
      return;
    }
    incidents.splice(incidentIndex, 1);
    renderIncidents();
    closeDeleteConfirmation();
    closeDetailModal();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const shipment = shipmentInput.value.trim();
    const description = descriptionInput.value.trim();
    if (!shipment || !description) return;

    if (editingIncidentId !== null) {
      const incident = incidents.find((item) => item.id === editingIncidentId);
      if (!incident) return;
      incident.shipment = shipment;
      incident.priority = priorityInput.value;
      incident.description = description;
    } else {
      incidents.unshift({
        id: nextId++,
        shipment,
        priority: priorityInput.value,
        deadline: Date.now() + 30 * 60 * 1000,
        description
      });
    }

    renderIncidents();
    closeIncidentModal();
  });

  [modal, detailModal, deleteConfirmModal].filter(Boolean).forEach((overlay) => {
    overlay.addEventListener('click', (event) => {
      if (event.target !== overlay) return;
      if (overlay === modal) closeIncidentModal();
      else if (overlay === detailModal) closeDetailModal();
      else closeDeleteConfirmation();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (deleteConfirmModal?.classList.contains('active')) {
      closeDeleteConfirmation();
      return;
    }
    if (detailModal.classList.contains('active')) closeDetailModal();
    if (modal.classList.contains('active')) closeIncidentModal();
  });

  renderIncidents();
  window.setInterval(updateTimers, 1000);
});
