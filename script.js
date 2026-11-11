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

  const kpiFields = {
    critical: document.getElementById('kpiCritical'),
    warning: document.getElementById('kpiWarning'),
    pending: document.getElementById('kpiPending'),
    success: document.getElementById('kpiSuccess')
  };

  // 1. Mobilné hamburger menu
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('active'));
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
    },
    {
      id: 2090,
      shipment: 'DPD Direct',
      priority: 'Doručené',
      deadline: Date.now(),
      description: 'Zásielka úspešne odovzdaná odberateľovi.'
    }
  ];

  let nextId = 2093;
  let selectedIncidentId = null;
  let editingIncidentId = null;

  const priorityClass = (priority) => {
    if (priority === 'Kritické') return 'critical';
    if (priority === 'Doručené') return 'success';
    return 'pending';
  };

  const timerClass = (priority) => {
    if (priority === 'Kritické') return 'critical';
    if (priority === 'Doručené') return 'success';
    return 'warning';
  };

  const formatRemainingTime = (deadline, priority) => {
    if (priority === 'Doručené') {
      return { expired: false, text: '✔ Vyriešené' };
    }

    const remainingSeconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    const twoDigits = (val) => String(val).padStart(2, '0');

    return {
      expired: remainingSeconds === 0,
      text: hours > 0
        ? `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`
        : `${twoDigits(minutes)}:${twoDigits(seconds)}`
    };
  };

  const updateTimersAndKPIs = () => {
    let criticalCount = 0;
    let warningCount = 0;
    let pendingCount = 0;
    let successCount = 0;

    incidents.forEach((incident) => {
      const remaining = formatRemainingTime(incident.deadline, incident.priority);
      const timer = tableBody.querySelector(`[data-timer-id="${incident.id}"]`);

      if (incident.priority === 'Kritické') criticalCount++;
      else if (incident.priority === 'Čakajúce') pendingCount++;
      else if (incident.priority === 'Doručené') successCount++;

      if (remaining.expired && incident.priority !== 'Doručené') {
        warningCount++;
      }

      if (timer) {
        if (incident.priority === 'Doručené') {
          timer.textContent = '✔ Vyriešené';
          timer.className = 'sla-timer success';
        } else {
          timer.textContent = remaining.expired
            ? `⏱ Po SLA · ${remaining.text}`
            : `⏱ ${remaining.text}`;
          timer.classList.toggle('overdue', remaining.expired);
        }
      }

      if (selectedIncidentId === incident.id && detailFields.timer) {
        detailFields.timer.textContent = incident.priority === 'Doručené'
          ? '✔ Vyriešené'
          : (remaining.expired ? `Po SLA · ${remaining.text}` : remaining.text);
      }
    });

    if (kpiFields.critical) kpiFields.critical.textContent = String(criticalCount);
    if (kpiFields.warning) kpiFields.warning.textContent = String(warningCount);
    if (kpiFields.pending) kpiFields.pending.textContent = String(pendingCount);
    if (kpiFields.success) kpiFields.success.textContent = String(successCount);
  };

  const renderIncidents = () => {
    tableBody.replaceChildren();

    incidents.forEach((incident) => {
      const row = document.createElement('tr');
      const pClass = priorityClass(incident.priority);
      row.className = pClass === 'critical' ? 'row-critical' : (pClass === 'success' ? 'row-success' : 'row-pending');

      const idCell = document.createElement('td');
      const idLabel = document.createElement('strong');
      idLabel.textContent = `#${incident.id}`;
      idCell.append(idLabel);

      const shipmentCell = document.createElement('td');
      shipmentCell.textContent = incident.shipment;

      const priorityCell = document.createElement('td');
      const badge = document.createElement('span');

      let badgeClass = 'badge-pending';
      if (incident.priority === 'Kritické') badgeClass = 'badge-critical';
      else if (incident.priority === 'Doručené') badgeClass = 'badge-success';

      badge.className = `badge ${badgeClass}`;
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

    updateTimersAndKPIs();
  };

  const closeIncidentModal = () => {
    modal.classList.remove('active');
    form.reset();
    editingIncidentId = null;
    const title = modal.querySelector('.modal-header h3');
    const submitButton = form.querySelector('button[type="submit"]');
    if (title) title.textContent = 'Nahlásiť nový incident';
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
    updateTimersAndKPIs();
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
    if (title) title.textContent = 'Nahlásiť nový incident';
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
    const priority = priorityInput.value;

    if (!shipment || !description) return;

    if (editingIncidentId !== null) {
      const incident = incidents.find((item) => item.id === editingIncidentId);
      if (!incident) return;
      incident.shipment = shipment;
      incident.priority = priority;
      incident.description = description;
    } else {
      let deadlineMinutes = 30;
      if (priority === 'Kritické') deadlineMinutes = 5;

      incidents.unshift({
        id: nextId++,
        shipment,
        priority,
        deadline: Date.now() + deadlineMinutes * 60 * 1000,
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
  window.setInterval(updateTimersAndKPIs, 1000);
});