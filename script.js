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
               'text'   (one line; add placeholder: 'Dela Cruz, Juan')
               'stars'  (1 to 5 stars; lo / hi are the end captions)
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
    endpoint: 'https://script.google.com/macros/s/AKfycbyittKGatRhEdNt29hJ6J8myhXu-lfasvMfzMN8PaL-zS2sLokBMzNcVWsKOSnU6q4g/exec',
    maxSubmissions: 0,            // 0 = unlimited (toggle off), 1 = once, 3 = three times...
    countKey: 'ccs_async_survey_count_v1',
    themeKey: 'ccs_survey_theme',
    backupKey: 'ccs_async_survey_backup'
};

/* ---- Reusable option sets ---- */
const STARS = { type: 'stars', lo: 'Not effective', hi: 'Very effective' };

/* ---- SURVEY ---- */
const STEPS = [
    /* 1 */
    {
        nav: 'About you',
        title: 'Tell us about you',
        sub: 'Your name helps us avoid duplicate responses and follow up on concerns.',
        fields: [{
                id: 'name',
                label: 'What is your name?',
                type: 'text',
                required: true,
                placeholder: 'Dela Cruz, Juan'
            },
            {
                id: 'year',
                label: 'Which pack are you in?',
                type: 'radio',
                required: true,
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
        nav: 'Setup',
        title: 'Your setup this week',
        sub: 'Tap the answer closest to your situation.',
        fields: [{
                id: 'location',
                label: 'Where did you mainly attend classes from?',
                type: 'radio',
                other: true,
                min: '210px',
                options: ['Home', 'Dorm / boarding house', "Relative's or friend's place", 'School / campus']
            },
            {
                id: 'internet',
                label: 'How stable was your internet connection?',
                type: 'radio',
                min: '210px',
                options: ['Stable', 'Occasional drops', 'Frequently unstable', 'No access at times']
            },
            {
                id: 'device',
                label: 'What device did you mainly use?',
                type: 'radio',
                min: '170px',
                options: ['Phone', 'Laptop', 'Tablet', 'Shared device']
            },
            {
                id: 'water_impact',
                label: 'Did the water interruption affect your ability to study?',
                type: 'radio',
                min: '170px',
                options: ['Not at all', 'A little', 'A lot', 'Severely']
            }
        ]
    },

    /* 3 */
    {
        nav: 'Ratings',
        title: 'Rate the week',
        sub: 'Tap a star. 1 is not effective, 5 is very effective.',
        fields: [
            { id: 'rate_online_classes', label: 'How effective were online classes (live sessions)?', ...STARS },
            { id: 'rate_async', label: 'How effective were asynchronous lessons and materials?', ...STARS },
            { id: 'rate_activities', label: 'How effective were online activities?', ...STARS },
            { id: 'rate_quizzes', label: 'How effective were online quizzes and exams?', ...STARS },
            { id: 'rate_instructions', label: 'How clear were the instructions from your instructors?', ...STARS },
            { id: 'rate_communication', label: 'How effective was communication with your instructors?', ...STARS }
        ]
    },

    /* 4 */
    {
        nav: 'Learning',
        title: 'Learning and workload',
        sub: 'Compared to a regular week.',
        fields: [{
                id: 'learning',
                label: 'Compared to face-to-face classes, how much did you learn this week?',
                type: 'radio',
                min: '170px',
                options: ['Much less', 'A bit less', 'About the same', 'More']
            },
            {
                id: 'workload',
                label: 'Was the workload manageable?',
                type: 'radio',
                min: '170px',
                options: ['Lighter than usual', 'Same as usual', 'Heavier than usual', 'Much heavier']
            },
            {
                id: 'deadlines',
                label: 'Were the deadlines reasonable?',
                type: 'radio',
                min: '150px',
                options: ['Yes', 'Mostly', 'Not really', 'No']
            }
        ]
    },

    /* 5 */
    {
        nav: 'Decisions',
        title: 'What should we do next time?',
        sub: 'Your answers guide how the college handles future disruptions.',
        fields: [{
                id: 'challenges',
                label: 'What were your biggest challenges? Select all that apply.',
                type: 'check',
                other: true,
                min: '230px',
                options: [
                    'Unstable internet',
                    'Power or water issues',
                    'Unclear instructions',
                    'Too many tasks',
                    'Lack of interaction',
                    'Hard to stay motivated',
                    'No major challenges'
                ]
            },
            {
                id: 'preferred_setup',
                label: 'If a disruption happens again, which setup do you prefer?',
                type: 'radio',
                min: '230px',
                options: [
                    'Fully asynchronous',
                    'Fully live online',
                    'A mix of both',
                    'Suspend classes',
                    'Face-to-face with water support'
                ]
            },
            {
                id: 'helpful',
                label: 'What would help you the most? Select all that apply.',
                type: 'check',
                other: true,
                min: '230px',
                options: [
                    'Longer deadlines',
                    'Recorded live sessions',
                    'Lighter workload',
                    'Mobile-friendly materials',
                    'More consultation hours'
                ]
            }
        ]
    },

    /* 6 */
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

/* ---- submission limit per device (CONFIG.maxSubmissions, 0 = unlimited) ---- */
const getCount = () => {
    const ls = parseInt(load(CONFIG.countKey), 10) || 0;
    const m = document.cookie.match(new RegExp(CONFIG.countKey + '=(\\d+)'));
    return Math.max(ls, m ? +m[1] : 0);
};
const limitReached = () => CONFIG.maxSubmissions > 0 && getCount() >= CONFIG.maxSubmissions;
const markDone = () => {
    const n = getCount() + 1;
    store(CONFIG.countKey, String(n));
    document.cookie = `${CONFIG.countKey}=${n}; max-age=31536000; path=/; SameSite=Lax`;
};
const limitText = () => CONFIG.maxSubmissions === 1
    ? 'You can take this survey only once.'
    : `You can take this survey only ${CONFIG.maxSubmissions} times.`;



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
        el.textContent = bad ? (f.type === 'text' ? 'Please type your answer to continue.' : 'Pick one to continue.') : '';
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
            <div class="floaters"><span class="chip" style="left:4%;top:10%">announcements!</span><span class="chip" style="right:6%;top:0;animation-delay:-2s">assignments!</span>
                <span class="chip" style="left:34%;top:62%;animation-delay:-4s">online class!</span></div>
            <div class="wrap"><h3>A survey on the effectiveness of</h3><h1 class="hero">Async Classes</h1>
            <h2>How did the water-interruption week go?</h2>
            <p>Organized by the Students' Rights and Welfare (STRAW) Committee. </p><p>Responses are handled under the Data Privacy Act of 2012 and used only to guide Student Council and institutional decisions.</p>
            <div class="actions" style="justify-content:center"><button class="btn" data-go="survey">Let's take on the survey</button></div></div></section>`;
    else if (S.screen === 'survey') renderStep();
    else if (S.screen === 'blocked') app.innerHTML = `<section class="screen"><div class="moon"></div>
        <h1>${limitText()}</h1><h2 class="bold-body">Thanks for howling with us, Pack!</h2>
        <p class="muted note">Your earlier response has already been recorded.</p></section>`;
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

function textHTML(f) {
    return `<input class="txt" type="text" id="${f.id}" data-text="${f.id}" value="${esc(S.a[f.id]||'')}" placeholder="${esc(f.placeholder||'')}" autocomplete="off">`;
}

function starsHTML(f) {
    const a = String(S.a[f.id] || '');
    const stars = [5, 4, 3, 2, 1].map(i =>
        `<input type="radio" id="${f.id}-${i}" name="${f.id}" value="${i}" ${a===String(i)?'checked':''}><label for="${f.id}-${i}" aria-label="${i} star${i>1?'s':''}">★</label>`).join('');
    return `<div class="rating"><div class="stars">${stars}</div><div class="cap"><span>${esc(f.lo||'')}</span><span>${esc(f.hi||'')}</span></div></div>`;
}

/* Next button shows once the last question is answered (rant is optional) */
const ready = (st, r) => {
    const l = st.fields[st.fields.length - 1];
    return r >= st.fields.length && (l.type === 'area' || !!valueOf(l));
};

function fieldHTML(f, i, revealed) {
    const body = f.type === 'text' ? textHTML(f) : f.type === 'stars' ? starsHTML(f) : f.type === 'area' ?
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
<div class="actions">${prevStep(S.step)>=0?'<button class="btn ghost" data-back>Back</button>':''}<button class="btn" data-next ${ready(st,r)?'':'hidden'}>${nxt<0?'Send my howl':'Next: '+STEPS[nxt].nav}</button></div>
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
    const nb = $('[data-next]'),
        nxt = nextStep(S.step),
        last = st.fields[n - 1];
    if (nb) {
        nb.hidden = !ready(st, r);
        nb.textContent = nxt < 0 ? 'Send my howl' : 'Next: ' + STEPS[nxt].nav;
    }
    /* last question answered: pan down to the Next button */
    if (nb && !nb.hidden && ['radio', 'stars', 'text'].includes(last.type) && valueOf(last))
        setTimeout(() => nb.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
    else if (first) first.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function submit() {
    if (limitReached()) {
        S.screen = 'blocked';
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
    if (t.dataset.text) {
        S.a[t.dataset.text] = t.value.trim();
        return advance();
    }
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
    if (t.dataset.text) S.a[t.dataset.text] = t.value.trim();
});

const saved = load(CONFIG.themeKey);
if (saved) document.documentElement.dataset.theme = saved;
if (limitReached()) S.screen = 'blocked';
render();
app.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.dataset.text) {
        e.preventDefault();
        e.target.blur();
    }
});