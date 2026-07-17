(() => {
  const entries = [
    { id: 'leonie', kind: 'user', name: 'Leonie Krüger', email: 'leonie.krueger@beispiel.de', status: 'Active access', date: 'Today', initials: 'LK', request: 'Kitchen assembly · Visit scheduled', attention: null, phone: '+49 151 248 9140' },
    { id: 'jonas', kind: 'user', name: 'Jonas Schneider', email: 'jonas.schneider@beispiel.de', status: 'Active access', date: 'Yesterday', initials: 'JS', request: 'Moving help · Under review', attention: 'Email verification needs review', phone: '+49 152 731 5521' },
    { id: 'sara', kind: 'invitation', name: 'Sara Mertens', email: 'sara.mertens@beispiel.de', status: 'Invitation pending', date: 'Sent 2 hours ago', initials: '✉', request: 'No requests yet', attention: null, phone: 'Not provided' },
    { id: 'david', kind: 'invitation', name: 'David Ocampo', email: 'david.ocampo@beispiel.de', status: 'Invitation expired', date: 'Expired yesterday', initials: '✉', request: 'No requests yet', attention: 'Invitation expired — access setup was not completed', phone: '+49 176 221 7074' },
    { id: 'marie', kind: 'user', name: 'Marie-Luise Hoffmann', email: 'marie-luise.hoffmann@beispiel.de', status: 'Active access', date: '3 days ago', initials: 'MH', request: 'Repairs & installations · Awaiting assessment', attention: null, phone: '+49 30 880 29 441' },
    { id: 'tobias', kind: 'user', name: 'Tobias Werner', email: 'tobias.werner@beispiel.de', status: 'Access blocked for this workspace', date: '6 days ago', initials: 'TW', request: 'Painting · Visit completed', attention: 'Access is blocked for this workspace', phone: '+49 177 050 4068' }
  ];
  const directoryRepresentations = [
    ['Ana Becker', 'ana.becker@beispiel.de'], ['Elias Roth', 'elias.roth@beispiel.de'],
    ['Clara Neumann', 'clara.neumann@beispiel.de'], ['Mehmet Kaya', 'mehmet.kaya@beispiel.de'],
    ['Hanna Fischer', 'hanna.fischer@beispiel.de'], ['Felix Bauer', 'felix.bauer@beispiel.de'],
    ['Sofia Wagner', 'sofia.wagner@beispiel.de'], ['Max Richter', 'max.richter@beispiel.de'],
    ['Miriam Keller', 'miriam.keller@beispiel.de'], ['Deniz Yilmaz', 'deniz.yilmaz@beispiel.de'],
    ['Lukas Weber', 'lukas.weber@beispiel.de'], ['Emilia König', 'emilia.koenig@beispiel.de'],
    ['Anton Vogt', 'anton.vogt@beispiel.de'], ['Johanna Brandt', 'johanna.brandt@beispiel.de'],
    ['Nico Stein', 'nico.stein@beispiel.de'], ['Paula Winter', 'paula.winter@beispiel.de'],
    ['Robert Hahn', 'robert.hahn@beispiel.de'], ['Julia Blum', 'julia.blum@beispiel.de']
  ].map(([name, email], index) => ({
    id: `directory-${index}`,
    kind: 'user',
    name,
    email,
    status: index < 16 ? 'Active access' : 'Inactive',
    date: index < 5 ? 'This week' : 'Earlier this month',
    initials: name.split(' ').map(part => part[0]).join(''),
    request: 'No additional context shown in this directory representation.',
    attention: null,
    phone: 'Not provided'
  }));
  const state = { filter: 'all', query: '', selected: null, directory: 'normal', inviteMode: 'idle', added: false, inspectorSection: 'overview', noteEditing: null, noteSaving: false, notes: {} };
  const $ = (selector) => document.querySelector(selector);
  const list = $('#directory-list'), directoryState = $('#directory-state'), workspace = $('.workspace'), inspector = $('#inspector-content');
  const dialog = $('#invite-dialog'), form = $('#invite-form'), trigger = $('#invite-trigger'), close = $('#invite-close'), cancel = $('#invite-cancel');
  const feedback = $('#form-feedback'), submit = $('#invite-submit'), nameInput = $('#invite-name'), emailInput = $('#invite-email');
  const detailBreakpoint = window.matchMedia('(max-width: 920px)');
  let inviteOrigin = null;
  let notePopupTimeout;

  function allEntries() {
    const directory = [...entries, ...directoryRepresentations];
    return state.added ? [...directory, { id: 'new', kind: 'invitation', name: 'Nora Bergmann', email: 'nora.bergmann@beispiel.de', status: 'Invitation pending', date: 'Just now', initials: '✉', request: 'No requests yet', attention: null, phone: 'Not provided' }] : directory;
  }
  function filteredEntries() {
    const query = state.query.toLowerCase().trim();
    return allEntries().filter((entry) => {
      const matchesQuery = !query || `${entry.name} ${entry.email}`.toLowerCase().includes(query);
      const matchesFilter = state.filter === 'all' || (state.filter === 'active' && entry.kind === 'user' && entry.status === 'Active access') || (state.filter === 'invitations' && entry.kind === 'invitation') || (state.filter === 'attention' && entry.attention);
      return matchesQuery && matchesFilter;
    });
  }
  function setSummary() {
    const data = allEntries();
    const total = state.directory === 'empty' ? 0 : data.length;
    const active = state.directory === 'empty' ? 0 : data.filter(x => x.status === 'Active access').length;
    const invitations = state.directory === 'empty' ? 0 : data.filter(x => x.kind === 'invitation').length;
    const attention = state.directory === 'empty' ? 0 : data.filter(x => x.attention).length;
    $('#summary-total').textContent = String(total);
    $('#summary-active').textContent = String(active);
    $('#summary-attention').textContent = String(attention);
    $('#filter-all-count').textContent = String(total);
    $('#filter-active-count').textContent = String(active);
    $('#filter-invitation-count').textContent = String(invitations);
    $('#filter-attention-count').textContent = String(attention);
  }
  function entryTemplate(entry) {
    const selected = state.selected === entry.id;
    const kindText = entry.kind === 'invitation' ? 'Invitation' : 'User';
    return `<button class="directory-entry ${selected ? 'selected' : ''}" type="button" data-entry="${entry.id}" role="listitem" aria-current="${selected ? 'true' : 'false'}" aria-label="${entry.name}, ${kindText}, ${entry.status}${entry.attention ? `, needs attention: ${entry.attention}` : ''}"><span class="entry-avatar ${entry.kind}">${entry.initials}</span><span class="entry-main"><span class="entry-title">${entry.name}</span><span class="entry-meta">${entry.email}</span></span><span class="entry-side"><span class="status ${entry.kind === 'invitation' ? 'invitation' : ''}"><span class="status-dot"></span>${entry.kind === 'invitation' ? 'Invitation' : 'User'}</span>${entry.attention ? '<span class="status attention">Needs attention</span>' : `<time>${entry.date}</time>`}</span></button>`;
  }
  function stateTemplate(type) {
    const configs = {
      empty: ['No people yet', 'People with access and pending invitations will appear here. Invite a customer when access should be created.', 'Invite customer'],
      noSearch: ['No search results', `No people or invitations match “${state.query || 'this search'}”. Try another name or email.`, 'Clear search'],
      noFilter: ['No results for this filter', 'No directory entries match the current condition. Reset the filter to see everyone.', 'Show all'],
      error: ['Directory unavailable', 'People and invitations could not be loaded. No changes were made. You can safely try again.', 'Try again']
    };
    const [heading, text, action] = configs[type];
    return `<div class="state-placeholder"><h3>${heading}</h3><p>${text}</p><button class="button button-secondary" type="button" data-state-action="${type}">${action}</button></div>`;
  }
  function renderDirectory() {
    setSummary(); directoryState.innerHTML = ''; list.innerHTML = '';
    if (state.directory === 'loading') { list.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>'; $('#result-count').textContent = 'Loading directory…'; return; }
    if (state.directory === 'refreshing') directoryState.innerHTML = '<div class="notice" role="status">Refreshing directory. Current results remain available.</div>';
    if (['empty', 'error', 'noSearch', 'noFilter'].includes(state.directory)) { list.innerHTML = stateTemplate(state.directory); $('#result-count').textContent = state.directory === 'error' ? 'Directory data unavailable' : '0 results'; return; }
    const data = filteredEntries();
    if (!data.length) { list.innerHTML = stateTemplate(state.query ? 'noSearch' : 'noFilter'); $('#result-count').textContent = '0 results'; return; }
    $('#result-count').textContent = `${data.length} shown · Directory includes people and invitations`;
    list.innerHTML = data.map(entryTemplate).join('');
  }
  function renderInspector() {
    const entry = allEntries().find(x => x.id === state.selected);
    if (!entry) { inspector.innerHTML = '<div class="empty-inspector"><h2 id="inspector-heading">Select a person</h2><p>Choose someone from the directory to review access, account context, requests, and activity.</p></div>'; workspace.classList.remove('detail-open'); return; }
    const isInvite = entry.kind === 'invitation';
    const tabs = isInvite ? ['overview', 'activity'] : ['overview', 'requests', 'activity'];
    const section = tabs.includes(state.inspectorSection) ? state.inspectorSection : 'overview';
    const attention = entry.attention ? `<section class="inspector-section inspector-attention"><h3>Needs attention</h3><div class="notice warning"><strong>${entry.attention}</strong><br />Review this access condition before promising a next step. No recovery action is shown until policy is defined.</div></section>` : '';
    const sectionContent = renderInspectorSection(entry, isInvite, section, attention);
    const status = entry.attention
      ? '<span class="status attention">Needs attention</span>'
      : isInvite
        ? '<span class="status invitation">Invitation pending</span>'
        : '<span class="status active"><span class="status-dot"></span>Active</span>';
    inspector.innerHTML = `<button class="quiet-button mobile-back" type="button" id="mobile-back">← Back to directory</button><header class="inspector-header"><div class="inspector-title"><span class="entry-avatar ${entry.kind}">${entry.initials}</span><div><h2 id="inspector-heading">${entry.name}</h2><p>${entry.email}</p></div></div>${status}</header><div class="inspector-tabs" role="tablist" aria-label="Person context sections">${tabs.map((tab) => `<button class="inspector-tab ${section === tab ? 'active' : ''}" type="button" role="tab" aria-selected="${section === tab}" data-inspector-section="${tab}">${tab[0].toUpperCase()}${tab.slice(1)}</button>`).join('')}</div><div class="inspector-panel" id="inspector-panel" role="tabpanel">${sectionContent}</div>`;
    if (detailBreakpoint.matches) {
      workspace.classList.add('detail-open');
      $('#mobile-back')?.focus();
    }
  }
  function renderInspectorSection(entry, isInvite, section, attention) {
    if (section === 'requests') return `<section class="inspector-section"><h3>Requests</h3><div class="context-item"><strong>${entry.request}</strong><p>Contextual request information remains within this person view.</p></div></section>`;
    if (section === 'activity') return `<section class="inspector-section"><h3>Activity</h3><div class="context-item"><strong>${entry.date}</strong><p>${isInvite ? 'Invitation context was last updated at this time.' : 'Latest available person and access context.'}</p></div></section>`;
    if (isInvite) return `<section class="inspector-section"><h3>Invitation</h3><dl class="detail-list"><div><dt>Invitation state</dt><dd>${entry.status}</dd></div><div><dt>Sent or updated</dt><dd>${entry.date}</dd></div><div><dt>Access</dt><dd>Access has not been activated.</dd></div></dl>${attention}<section class="inspector-section"><h3>Operational context</h3><p>${entry.request}</p></section></section>`;
    const addresses = entry.id === 'leonie'
      ? '<div><dt>Primary address</dt><dd>Kantstraße 48, 10625 Berlin</dd></div><div><dt>Secondary address</dt><dd>Wilmersdorfer Straße 81, 10629 Berlin</dd></div>'
      : '<div><dt>Primary address</dt><dd>Not provided</dd></div>';
    return `<section class="inspector-section"><h3>Profile</h3><dl class="detail-list"><div><dt>Name</dt><dd>${entry.name}</dd></div><div><dt>Email</dt><dd>${entry.email}</dd></div><div><dt>Phone</dt><dd>${entry.phone}</dd></div>${addresses}</dl></section>${renderNotes(entry)}`;
  }
  function escapeHtml(value) { return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]); }
  function renderNotes(entry) {
    const note = state.notes[entry.id] ?? 'Customer prefers appointment updates by email. Confirm the service window before the visit.';
    const popup = '<div class="note-popup success" id="note-popup" role="status" hidden><span class="note-popup__icon" aria-hidden="true">✓</span><span id="note-popup-message"></span></div>';
    if (state.noteEditing === entry.id) {
      const saveLabel = state.noteSaving ? '<span class="button-spinner" aria-hidden="true"></span>Saving changes' : 'Save changes';
      return `<section class="inspector-section notes-section">${popup}<div class="inspector-section__header"><h3>Notes</h3></div><form class="notes-form" id="notes-form"><label for="notes-textarea">Internal notes</label><textarea id="notes-textarea" name="notes">${escapeHtml(note)}</textarea><div class="notes-form__actions"><button class="button button-secondary" type="button" data-note-cancel>Cancel</button><button class="button button-primary" type="submit" ${state.noteSaving ? 'disabled' : ''}>${saveLabel}</button></div></form></section>`;
    }
    return `<section class="inspector-section notes-section">${popup}<div class="inspector-section__header"><h3>Notes</h3><button class="quiet-button" type="button" data-note-edit>Edit</button></div><p>${escapeHtml(note)}</p></section>`;
  }
  function showNotePopup(message, type = 'success') {
    const notePopup = $('#note-popup'), notePopupMessage = $('#note-popup-message');
    if (!notePopup || !notePopupMessage) return;
    notePopup.className = `note-popup ${type}`;
    notePopupMessage.textContent = message;
    notePopup.hidden = false;
    window.clearTimeout(notePopupTimeout);
    notePopupTimeout = window.setTimeout(() => { notePopup.hidden = true; }, 3200);
  }
  function selectEntry(id) { state.selected = id; state.inspectorSection = 'overview'; state.noteEditing = null; state.noteSaving = false; renderDirectory(); renderInspector(); }
  function applyFilter(filter) { state.filter = filter; state.directory = 'normal'; document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === filter)); renderDirectory(); }
  function clearFormFeedback() { feedback.innerHTML = ''; nameInput.removeAttribute('aria-invalid'); emailInput.removeAttribute('aria-invalid'); $('#name-error').textContent = ''; $('#email-error').textContent = ''; submit.disabled = false; submit.textContent = 'Send invitation'; }
  function openInvite(mode = 'idle', origin = trigger) { inviteOrigin = origin; state.inviteMode = mode; clearFormFeedback(); dialog.showModal(); nameInput.focus(); if (mode !== 'idle') window.setTimeout(() => simulateInvite(mode), 20); }
  function closeInvite() { dialog.close(); if (inviteOrigin?.focus) inviteOrigin.focus(); }
  function simulateInvite(mode) {
    clearFormFeedback();
    if (mode === 'validation') { nameInput.setAttribute('aria-invalid', 'true'); emailInput.setAttribute('aria-invalid', 'true'); $('#name-error').textContent = 'Enter the customer’s name.'; $('#email-error').textContent = 'Enter a valid email address.'; nameInput.focus(); return; }
    if (mode === 'pending') { submit.disabled = true; submit.textContent = 'Sending invitation…'; feedback.innerHTML = '<div class="notice" role="status">Creating the access invitation. Please keep this window open; sending is in progress.</div>'; return; }
    if (mode === 'success') { state.added = true; renderDirectory(); closeInvite(); selectEntry('new'); directoryState.innerHTML = '<div class="notice success" role="status">Invitation created for Nora Bergmann. The pending access is now visible in the directory.</div>'; return; }
    if (mode === 'access-exists') { feedback.innerHTML = '<div class="notice error" role="alert"><strong>This person already has access to this company workspace.</strong><br />No invitation was created. Review their existing directory entry instead of sending another invitation.</div>'; return; }
    if (mode === 'invite-pending') { feedback.innerHTML = '<div class="notice warning" role="alert"><strong>An invitation is already pending for this person.</strong><br />No new invitation was created. Review the existing invitation to resend it if needed.</div>'; return; }
    if (mode === 'service-failure') { feedback.innerHTML = '<div class="notice warning" role="alert"><strong>Access is pending, but the invitation could not be delivered.</strong><br />Your entered details are still here. Do not send a duplicate invitation; use the pending invitation’s resend action after locating it.</div>'; return; }
  }
  function submitInvite(event) { event.preventDefault(); clearFormFeedback(); const name = nameInput.value.trim(), email = emailInput.value.trim(); if (!name || !email.includes('@')) { simulateInvite('validation'); return; } submit.disabled = true; submit.textContent = 'Sending invitation…'; feedback.innerHTML = '<div class="notice" role="status">Creating the access invitation. Please keep this window open; sending is in progress.</div>'; window.setTimeout(() => { state.added = true; renderDirectory(); closeInvite(); selectEntry('new'); directoryState.innerHTML = `<div class="notice success" role="status">Invitation created for ${name}. The pending access is now visible in the directory.</div>`; }, 700); }
  list.addEventListener('click', (event) => { const entry = event.target.closest('[data-entry]'); if (entry) selectEntry(entry.dataset.entry); const action = event.target.closest('[data-state-action]'); if (action) { if (action.dataset.stateAction === 'empty') openInvite(); else if (action.dataset.stateAction === 'noSearch') { $('#search-input').value = ''; state.query = ''; state.directory = 'normal'; renderDirectory(); } else { state.directory = 'normal'; state.filter = 'all'; applyFilter('all'); } } });
  document.addEventListener('click', (event) => { const filter = event.target.closest('[data-filter]'); if (filter) applyFilter(filter.dataset.filter); });
  $('#search-input').addEventListener('input', (event) => { state.query = event.target.value; state.directory = 'normal'; renderDirectory(); });
  $('#refresh-button').addEventListener('click', () => { state.directory = 'refreshing'; renderDirectory(); window.setTimeout(() => { state.directory = 'normal'; renderDirectory(); }, 900); });
  trigger.addEventListener('click', () => openInvite()); close.addEventListener('click', closeInvite); cancel.addEventListener('click', closeInvite); form.addEventListener('submit', submitInvite);
  $('#demo-toggle').addEventListener('click', (event) => { const box = $('#demo-content'); box.hidden = !box.hidden; event.currentTarget.setAttribute('aria-expanded', String(!box.hidden)); });
  $('#apply-demo').addEventListener('click', () => { const userState = $('#demo-users-state').value, inviteState = $('#demo-invite-state').value; state.directory = userState; state.selected = null; state.inspectorSection = 'overview'; state.query = ''; $('#search-input').value = ''; if (userState === 'selected-user') { state.directory = 'normal'; state.selected = 'leonie'; } if (userState === 'selected-invitation') { state.directory = 'normal'; state.selected = 'sara'; } if (userState === 'attention') { state.directory = 'normal'; state.filter = 'attention'; document.querySelector('[data-filter="attention"]').classList.add('active'); } if (userState === 'no-search') { state.query = 'Karin Beispiel'; $('#search-input').value = state.query; } if (userState === 'no-filter') { state.filter = 'invitations'; } renderDirectory(); renderInspector(); if (inviteState === 'success') { state.added = false; openInvite('success'); } else if (inviteState !== 'idle') openInvite(inviteState); });
  inspector.addEventListener('click', (event) => { const tab = event.target.closest('[data-inspector-section]'); if (tab) { state.inspectorSection = tab.dataset.inspectorSection; renderInspector(); inspector.querySelector(`[data-inspector-section="${state.inspectorSection}"]`)?.focus(); return; } if (event.target.closest('[data-note-edit]')) { state.noteEditing = state.selected; renderInspector(); $('#notes-textarea')?.focus(); return; } if (event.target.closest('[data-note-cancel]')) { state.noteEditing = null; renderInspector(); return; } if (event.target.closest('#mobile-back')) { workspace.classList.remove('detail-open'); const origin = document.querySelector(`[data-entry="${state.selected}"]`); origin?.focus(); } });
  inspector.addEventListener('submit', (event) => { if (event.target.id !== 'notes-form') return; event.preventDefault(); const note = $('#notes-textarea').value.trim(); state.noteSaving = true; renderInspector(); window.setTimeout(() => { state.notes[state.selected] = note; state.noteSaving = false; state.noteEditing = null; renderInspector(); showNotePopup('Notes saved.'); }, 650); });
  detailBreakpoint.addEventListener('change', (event) => {
    if (!event.matches) { workspace.classList.remove('detail-open'); return; }
    if (state.selected) workspace.classList.add('detail-open');
  });
  renderDirectory(); renderInspector();
})();
