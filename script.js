/* =========================================================================
   CCS DISCORD SURVEY: CONFIGURATION 
   -------------------------------------------------------------------------
   To change the survey, edit only the SURVEY section below.

   STEP
     nav     Label in the top navigation
     title   Heading of the section
     sub     Small text under the heading
     skip    (optional) function(answers) => true to skip this whole section
     fields  Array of FIELD objects

   FIELD
     id        Unique key, also the column name sent to the spreadsheet
     label     The question text
     type      'radio'  (pick one)
               'check'  (pick many)
               'area'   (free text)
     required  true / false (default false)
     other     true adds an "Other: ____" choice (radio / check only)
     min       Minimum tile width, e.g. '210px' (radio / check only)
     big       true makes tiles larger (radio / check only)
     options   Array of choices (radio / check only). Each is either:
                 'Plain text'
                 { v: 'stored value', t: 'Title shown', sub: 'Small text', tone: 'it|is|ca|cs' }

   Questions in a section appear one by one: the next one is revealed once
   the previous one is answered.
   ========================================================================= */

const CONFIG = {
    endpoint: 'https://script.google.com/macros/s/AKfycbwlcZHVPw2otsY2l0TY-cCMEjt9EKEtY9_roUT0a5Owpr83FaspcHB3e_VbJnSG4BKC/exec',
    oneSubmission: false,
    doneKey: 'ccs_survey_submitted_v1',
    themeKey: 'ccs_survey_theme',
    backupKey: 'ccs_survey_backup'
};

/* ---- Reusable option sets ---- */
const AGREE = [
    'Yes, strongly agree',
    'Yes, somewhat agree',
    'Neutral',
    'No, disagree',
    'Unsure / No opinion'
];

/* ---- SURVEY ---- */
const STEPS = [
    /* 1 */
    {
        nav: 'About you',
        title: 'Tell us hints about you',
        sub: 'Anonymous. No names, no emails.',
        fields: [{
                id: 'year',
                label: 'Which pack are you in?',
                type: 'radio',
                min: '150px',
                big: true,
                options: [
                    { v: '1st Year', t: 'Freshie Wolf', sub: '1st Year' },
                    { v: '2nd Year', t: 'Sophomore Wolf', sub: '2nd Year' },
                    { v: '3rd Year', t: 'Junior Wolf', sub: '3rd Year' },
                    { v: '4th Year', t: 'Senior Wolf', sub: '4th Year' }
                ]
            },
            {
                id: 'program',
                label: 'Which den do you belong to?',
                type: 'radio',
                required: true,
                min: '150px',
                big: true,
                options: [
                    { v: 'IT', t: 'Information Technology', sub: 'IT', tone: 'it' },
                    { v: 'IS', t: 'Information Systems', sub: 'IS', tone: 'is' },
                    { v: 'CA', t: 'Computer Applications', sub: 'CA', tone: 'ca' },
                    { v: 'CS', t: 'Computer Science', sub: 'CS', tone: 'cs' }
                ]
            }
        ]
    },

    /* 2 */
    {
        nav: 'Interest',
        title: 'Would a CCS Discord work?',
        sub: 'Tap the answer closest to how you feel.',
        fields: [{
                id: 'uses_discord',
                label: 'Do you currently use Discord?',
                type: 'radio',
                min: '210px',
                options: [
                    'Nope, and I do not intend to use it',
                    'Nope, but willing to create an account',
                    'I have an account, but rarely use it',
                    'Yeah, occasionally',
                    'Yes, daily / regularly'
                ]
            },
            {
                id: 'messenger_effectiveness',
                label: 'How effective are Messenger group chats for college-wide updates and academic concerns?',
                type: 'radio',
                min: '210px',
                options: [
                    'Very effective',
                    'Somewhat effective',
                    'Neutral',
                    'Ineffective (too chaotic / announcements get buried)'
                ]
            },
            {
                id: 'connect_community',
                label: 'Will an official CCS Discord Server help connect students across the entire CCS community?',
                type: 'radio',
                other: true,
                min: '170px',
                options: AGREE
            },
            {
                id: 'reach_council',
                label: 'Will it make it easier to reach out to the Student Council?',
                type: 'radio',
                other: true,
                min: '170px',
                options: AGREE
            },
            {
                /* Answering "No" here skips the Discord preferences section */
                id: 'support',
                label: 'Would you support an official, structured CCS Discord Server as an alternative or supplement to current platforms?',
                type: 'radio',
                min: '210px',
                required: true,
                options: ['Yes', 'No']
            }
        ]
    },

    /* 3 */
    {
        nav: 'Preferences',
        title: 'Build the Den',
        sub: 'Pick what you would actually use.',
        skip: a => a.support === 'No',
        fields: [{
                id: 'channels',
                label: 'Which channels would be most useful? Select all that apply.',
                type: 'check',
                other: true,
                min: '230px',
                options: [
                    { v: '#official-announcements', t: '#official-announcements' },
                    { v: '#academic-help-and-resources', t: '#academic-help-and-resources' },
                    { v: '#year-level-channels', t: '#year-level-channels', sub: 'Class-specific discussions and updates' },
                    { v: '#career-and-internships', t: '#career-and-internships', sub: 'Job openings, seminars, tech opportunities' },
                    { v: '#gaming-and-recreation', t: '#gaming-and-recreation', sub: 'Esports, casual gaming, organization lounges' },
                    { v: '#tech-and-projects', t: '#tech-and-projects', sub: 'Student projects, open-source collaboration' },
                    { v: '#helpdesk-and-concerns', t: '#helpdesk-and-concerns', sub: 'Ticket system to raise welfare concerns to STRAW' }
                ]
            },
            {
                id: 'engagement',
                label: 'How likely are you to join server events like study sessions, gaming tournaments, tech talks, and Q&As?',
                type: 'radio',
                min: '120px',
                options: ['Very likely', 'Likely', 'Unlikely', 'Not at all']
            },
             {

                id: 'eaten_already',
                label: 'Kumain Ka Na Ba? Eaten Already???',
                type: 'radio',
                min: '210px',
                options: ['Yes', 'No']
            },
            {

                id: 'sino',
                label: 'Kinsa imong pilion',
                type: 'radio',
                min: '210px',
                options: ['Ako', 'Imong Ex', 'Siya', 'Og ako nlng diay...']
            }
        ]
    },

    /* 4 */
    {
        nav: 'Rant',
        title: 'Free rant space',
        sub: 'Anything on your mind? Totally optional.',
        fields: [{
            id: 'rant',
            label: 'Share your thoughts',
            type: 'area'
        }]
    }
];

/* =========================================================================
   OOPS :<< how it works section, wag nang i touch
   ========================================================================= */

const $ = s => document.querySelector(s),
    app = $('#app');
const esc = s => String(s).replace(/[&<>"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
} [c]));

const S = {
    screen: 'entry',
    step: 0,
    done: new Set(),
    a: {}, // answers
    o: {}, // "other" text
    rev: {} // how many fields are revealed per step
};

const store = (k, v) => {
    try { localStorage.setItem(k, v) } catch (e) {}
};
const load = k => {
    try { return localStorage.getItem(k) } catch (e) { return null }
};

/* ---- sky ---- */
const sky = $('#sky');
for (let i = 0; i < 70; i++) {
    const s = document.createElement('i');
    s.className = 'star';
    s.style.cssText =
        `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*3}s;animation-duration:${2+Math.random()*3}s;transform:scale(${.6+Math.random()})`;
    sky.appendChild(s);
}

function setTheme(t) {
    document.documentElement.dataset.theme = t;
    store(CONFIG.themeKey, t);
}

/* ---- one submission per device (CONFIG.oneSubmission) ---- */
const alreadyDone = () => CONFIG.oneSubmission &&
    (load(CONFIG.doneKey) || document.cookie.includes(CONFIG.doneKey + '=1'));
const markDone = () => {
    if (!CONFIG.oneSubmission) return;
    store(CONFIG.doneKey, '1');
    document.cookie = CONFIG.doneKey + '=1; max-age=31536000; path=/; SameSite=Lax';
};

/* ---- step navigation (supports skipped sections) ---- */
const isSkipped = i => !!(STEPS[i].skip && STEPS[i].skip(S.a));
const nextStep = from => {
    for (let i = from + 1; i < STEPS.length; i++)
        if (!isSkipped(i)) return i;
    return -1;
};
const prevStep = from => {
    for (let i = from - 1; i >= 0; i--)
        if (!isSkipped(i)) return i;
    return -1;
};

/* ---- answers ---- */
function valueOf(f) {
    const a = S.a[f.id],
        fix = v => v === '__other__' ? (S.o[f.id] ? 'Other: ' + S.o[f.id] : '') : v;
    return Array.isArray(a) ? a.map(fix).filter(Boolean).join(', ') : fix(a || '');
}

function validate() {
    let ok = true;
    STEPS[S.step].fields.forEach(f => {
        const el = document.querySelector(`[data-field="${f.id}"] .error`);
        const bad = f.required && !valueOf(f);
        el.textContent = bad ? 'Pick one to continue.' : '';
        if (bad && ok) {
            ok = false;
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
    return ok;
}

/* ---- screens ---- */
function render() {
    if (S.screen === 'entry') app.innerHTML =
        `<section class="screen">
            <div class="moon"></div><h1 class="hero">Howl, Mate!</h1>
            <p>Do you prefer dark mode or light mode? Tap to try both.</p>
            <div class="grid wrap" style="--min:140px;max-width:380px">
                ${['dark','light'].map(t=>`<label class="tile t-theme big"><input type="radio" name="theme" value="${t}" ${document.documentElement.dataset.theme===t?'checked':''}><b>${t==='dark'?'Dark mode':'Light mode'}</b></label>`).join('')}
            </div>
            <div class="actions"><button class="btn" data-go="intro">Let's go</button></div></section>`;
    else if (S.screen === 'intro') app.innerHTML =
        `<section class="screen">
            <div class="floaters"><span class="chip" style="left:4%;top:10%">#announcements</span><span class="chip" style="right:6%;top:0;animation-delay:-2s">#howl-at-the-moon</span>
                <span class="chip" style="left:22%;top:62%;animation-delay:-4s">#helpdesk</span><span class="chip" style="right:14%;top:58%;animation-delay:-1s">#tech-and-projects</span></div>
            <div class="wrap"><h3>A survey on the feasibility of a</h3><h1 class="hero"> CCS Discord</h1>
            <h2>Take part in the investigation!</h2>
            <p>Organized by the Students' Rights and Welfare (STRAW) Committee. </p><p>Your answers are anonymous, handled under the Data Privacy Act of 2012, and used only to guide Student Council initiatives.</p>
            <div class="actions" style="justify-content:center"><button class="btn" data-go="survey">Let's take on the survey</button></div></div></section>`;
    else if (S.screen === 'survey') renderStep();
    else app.innerHTML = `<section class="screen"><div class="moon"></div>
            <h1>Thank you for participating in the survey</h1><h2 class="bold-body">Let's keep on howling, Pack!</h2>
            <p class="muted note">Your submission helps the CCS Student Council understand student concerns and improve services, programs, and student representation. All responses will be reviewed carefully and may help guide future actions and initiatives.</p>
            ${S.msg?`<p class="muted note">${esc(S.msg)}</p>`:''}</section>`;
    window.scrollTo(0, 0);
}

function tile(f, o) {
    o = typeof o === 'string' ? { v: o } : o;
    const type = f.type === 'check' ? 'checkbox' : 'radio',
        a = S.a[f.id],
        on = f.type === 'check' ? (a || []).includes(o.v) : a === o.v;
    return `<label class="tile ${o.tone||''} ${f.big?'big':''}"><input type="${type}" name="${f.id}" value="${esc(o.v)}" ${on?'checked':''}><b>${esc(o.t||o.v)}</b>${o.sub?`<small>${esc(o.sub)}</small>`:''}</label>`;
}

function otherTile(f) {
    const type = f.type === 'check' ? 'checkbox' : 'radio',
        a = S.a[f.id],
        on = f.type === 'check' ? (a || []).includes('__other__') : a === '__other__';
    return `<label class="tile"><input type="${type}" name="${f.id}" value="__other__" ${on?'checked':''}><b>Other</b><input class="other" type="text" data-other="${f.id}" value="${esc(S.o[f.id]||'')}" aria-label="Other answer"></label>`;
}

function fieldHTML(f, i, revealed) {
    const body = f.type === 'area' ?
        `<textarea id="${f.id}" data-area="${f.id}">${esc(S.a[f.id]||'')}</textarea>` :
        `<div class="grid" style="--min:${f.min||'150px'}">${f.options.map(o=>tile(f,o)).join('')}${f.other?otherTile(f):''}</div>`;
    return `<div class="field" data-field="${f.id}" ${i>=revealed?'hidden':''}><span class="q">${f.label}${f.required?' <span class="req">*</span>':''}</span>${body}<div class="error" role="alert"></div></div>`;
}

function renderStep() {
    const st = STEPS[S.step],
        n = st.fields.length,
        nxt = nextStep(S.step);
    let r = S.rev[S.step] || 1;
    while (r < n && valueOf(st.fields[r - 1])) r++;
    S.rev[S.step] = r;

    const navButtons = STEPS.map((s, i) => isSkipped(i) ? '' :
        `<button data-jump="${i}" class="${i===S.step?'cur':''} ${S.done.has(i)?'done':''}" ${(S.done.has(i)||i===S.step)?'':'disabled'}>${s.nav}</button>`
    ).join('');

    app.innerHTML = `<main class="survey">
<div class="top"><nav class="trav" aria-label="Survey sections">${navButtons}</nav><button class="btn ghost" data-theme-toggle>Switch theme</button></div>
<h1>${st.title}</h1><p class="muted">${st.sub}</p>
${st.fields.map((f,i)=>fieldHTML(f,i,r)).join('')}
<div class="actions">${prevStep(S.step)>=0?'<button class="btn ghost" data-back>Back</button>':''}<button class="btn" data-next ${r<n?'hidden':''}>${nxt<0?'Send my howl':'Next: '+STEPS[nxt].nav}</button></div>
<div class="error" id="status" role="status"></div>
</main>`;
    window.scrollTo(0, 0);
}

/* reveal the next question(s) once the previous is answered */
function advance() {
    const st = STEPS[S.step],
        n = st.fields.length;
    let r = S.rev[S.step] || 1,
        first = null;
    while (r < n && valueOf(st.fields[r - 1])) {
        const el = document.querySelector(`[data-field="${st.fields[r].id}"]`);
        if (el && el.hidden) {
            el.hidden = false;
            el.classList.add('pop');
            first = first || el;
        }
        r++;
    }
    S.rev[S.step] = r;
    if (r >= n) {
        const nb = $('[data-next]');
        if (nb) nb.hidden = false;
    }
    /* the Next button label depends on whether later sections are skipped */
    const nb = $('[data-next]'),
        nxt = nextStep(S.step);
    if (nb) nb.textContent = nxt < 0 ? 'Send my howl' : 'Next: ' + STEPS[nxt].nav;
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function submit() {
    if (alreadyDone()) {
        S.msg = 'A response has already been submitted from this device.';
        S.screen = 'done';
        return render();
    }
    const data = { submitted_at: new Date().toISOString() };
    /* answers from skipped sections are sent blank */
    STEPS.forEach((s, i) => s.fields.forEach(f => data[f.id] = isSkipped(i) ? '' : valueOf(f)));
    store(CONFIG.backupKey, JSON.stringify(data));

    const btn = $('[data-next]'),
        st = $('#status');
    btn.disabled = true;
    st.textContent = '';

    if (!CONFIG.endpoint) {
        markDone();
        S.msg = 'Saved on this device only. Set CONFIG.endpoint to send answers to Google Sheets.';
        S.screen = 'done';
        return render();
    }
    try {
        await fetch(CONFIG.endpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(data)
        });
        markDone();
        S.msg = '';
        S.screen = 'done';
        render();
    } catch (e) {
        btn.disabled = false;
        st.textContent = 'Could not send your response. Check your connection and try again.';
    }
}

/* ---- events ---- */
app.addEventListener('click', e => {
    const g = e.target.closest('[data-go]');
    if (g) {
        S.screen = g.dataset.go;
        return render();
    }
    if (e.target.closest('[data-theme-toggle]'))
        return setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    if (e.target.closest('[data-back]')) {
        const p = prevStep(S.step);
        if (p >= 0) S.step = p;
        return renderStep();
    }
    const j = e.target.closest('[data-jump]');
    if (j) {
        S.step = +j.dataset.jump;
        return renderStep();
    }
    if (e.target.closest('[data-next]')) {
        if (!validate()) return;
        S.done.add(S.step);
        const nxt = nextStep(S.step);
        if (nxt < 0) return submit();
        S.step = nxt;
        renderStep();
    }
});

app.addEventListener('change', e => {
    const t = e.target;
    if (t.name === 'theme') return setTheme(t.value);
    if (!t.name || t.type === 'text') return;
    if (t.type === 'radio') S.a[t.name] = t.value;
    else S.a[t.name] = [...document.querySelectorAll(`input[name="${t.name}"]:checked`)].map(i => i.value);
    advance();
});

const pickOther = t => {
    const r = t.closest('.tile').querySelector('input:not([type=text])');
    if (!r.checked) {
        r.checked = true;
        r.dispatchEvent(new Event('change', { bubbles: true }));
    }
};
app.addEventListener('focusin', e => {
    if (e.target.dataset.other) pickOther(e.target);
});
app.addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.other) {
        S.o[t.dataset.other] = t.value.trim();
        pickOther(t);
        advance();
    }
    if (t.dataset.area) S.a[t.dataset.area] = t.value.trim();
});

const saved = load(CONFIG.themeKey);
if (saved) document.documentElement.dataset.theme = saved;
render();