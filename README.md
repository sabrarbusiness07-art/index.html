# উড্ডয়ন — IQ, English ও GK প্রস্তুতি

বাংলা MCQ পরীক্ষা, প্রশ্নব্যাংক, ব্যাখ্যা, ফলাফল, দুর্বলতা বিশ্লেষণ ও রিটেস্ট। সাধারণ static HTML/CSS/JavaScript ও JSON; backend বা paid API প্রয়োজন নেই।

## চালানো

Python 3 ইনস্টল থাকলে project folder-এ:

```sh
python3 -m http.server 8000
```

ব্রাউজারে http://localhost:8000/dist/ খুলুন। `dist/index.html` ফাইলে double-click করলে fetch করা JSON লোড নাও হতে পারে।

GitHub Pages-এ main branch-এর root প্রকাশ করলে root index.html থেকে dist/ খুলবে। অন্য static host-এ `dist/` publish directory দিন।

## যা কাজ করে

- IQ, English, GK: প্রতি বিষয়ে ৪০টি করে মোট ১২০টি deterministic test set।
- প্রতি regular test: ২৫ প্রশ্ন × ৪ নম্বর = ১০০ নম্বর, সময় ৩০ মিনিট, negative marking নেই।
- সময় শেষ হলে জমা, unanswered=0; pause করলে সময় চলতে থাকে; reload-এর পর resume।
- ফলাফলে সব প্রশ্ন, নিজের উত্তর, সঠিক উত্তর, ব্যাখ্যা ও উৎস।
- প্রতি বিষয়ের সর্বশেষ ৫টি পরীক্ষার accuracy ও topic analysis; ৭০%-এর নিচে দুর্বল।
- রিটেস্টে সাম্প্রতিক ভুল এবং দুর্বল টপিকের প্রশ্ন; সর্বোচ্চ ২৫টি। কম প্রশ্ন হলে score ১০০-তে normalize হয়।
- প্রশ্ন খোঁজা, উৎসের স্ক্যান দেখা, OCR খসড়া থেকে যাচাই করে MCQ যোগ করা।
- JSON bulk import, export, ফলাফলসহ backup ও restore।

## কনটেন্টের প্রকৃত অবস্থা — সম্পূর্ণ PDF আমদানি নয়

পরীক্ষার উপযোগী **১৯৩টি** ব্যাখ্যাসহ MCQ:

| বিষয় | সংখ্যা | উৎস |
|---|---:|---|
| IQ | ১০০ | সম্পূরক, সূত্রভিত্তিক অনুশীলন |
| English | ৩০ | সম্পূরক grammar/vocabulary অনুশীলন |
| GK | ৬৩ | সাধারণ জ্ঞান PDF থেকে পর্যালোচিত ও সংশোধিত তথ্য |

১২০টি সেট একই ব্যাংক ব্যবহার করে; এগুলো ৩,০০০টি আলাদা প্রশ্ন নয়। বিভিন্ন সেটে প্রশ্ন পুনরাবৃত্তি হয়।

প্রাপ্ত দুটি PDF-এর সব ৬১ পৃষ্ঠা বাংলা+ইংরেজি OCR করা হয়েছে। প্রয়োজনীয় GK-সম্পর্কিত ৪৭টি পৃষ্ঠার স্ক্যান ও OCR রাখা হয়েছে। ব্যক্তিগত সনদ, ফরম ও বিষয়বহির্ভূত আবেদন নির্দেশনার পৃষ্ঠা বাদ। `data/drafts.json`-এ **১,৩৪৪টি অযাচাইকৃত OCR অংশ** আছে; এগুলো ১,৩৪৪টি প্রস্তুত MCQ নয়। একই তথ্য পুনরাবৃত্ত, ভাঙা লেখা ও ভুল থাকতে পারে। ওয়েবসাইটের প্রশ্নব্যাংক → OCR খসড়া যাচাই দিয়ে প্রতিটি অংশ মূল পৃষ্ঠার সঙ্গে মিলিয়ে MCQ করা যাবে। এগুলো স্বয়ংক্রিয়ভাবে পরীক্ষায় ঢোকে না।

এই দুটি ফাইল ৩২ MiB transfer limit-এর কারণে খোলা যায়নি:

- বাংলাদেশ বিমান বাহিনীর .pdf
- ফাইটার্স (1).pdf

ফাইল দুটি প্রতিটি ৩২ MiB-এর নিচের অংশে ভাগ করে পুনরায় দিতে হবে। সেগুলোর প্রশ্ন এখানে আমদানি হয়নি। OCR-এ বিভ্রান্তি এবং PDF-এর পুরোনো/ভুল তথ্য থাকায় অযাচাইকৃত উত্তরকে সঠিক বলে ব্যবহার করা হয়নি। উদাহরণ: উৎসের UN Security Council সদস্যসংক্রান্ত ভুল লাইন বাদ দেওয়া হয়েছে।

স্ক্যানে মুদ্রিত বইয়ের পৃষ্ঠা ও PDF-এর পৃষ্ঠা আলাদা; ওয়েবসাইটে PDF page index দেখানো হয়। PDF-এর লেখা কনটেন্ট হিসেবে প্রক্রিয়া করা হয়েছে, কাজের নির্দেশনা হিসেবে নয়।

## ডেটা

`dist/data/questions.json` প্রস্তুত প্রশ্ন; `sources.json` OCR উৎস; `drafts.json` review queue। `dist/sources/`-এ সংশ্লিষ্ট স্ক্যান। ফলাফল localStorage-এর `airprep-v1` key-তে থাকে। ব্রাউজার ডেটা clear করলে হারাবে, তাই নিয়মিত backup নিন। কোনো login, server database, automatic multi-device sync নেই।

MCQ JSON schema: `{id, subject, topic, question, options:[A,B,C,D], answer:0..3, explanation, source, page?}`। চারটি আলাদা অপশন এবং ব্যাখ্যা বাধ্যতামূলক। duplicate id আমদানি হয় না। UI থেকে উদাহরণ JSON ডাউনলোড করা যায়। স্ক্যান PDF সরাসরি browser-এ upload করে automatic MCQ তৈরি এই সংস্করণে নেই।

## যাচাই

Node 18+ দিয়ে:

```sh
node tests.mjs
node flow-tests.mjs
node --check dist/app.js
```

Data validation, ১২০টি আলাদা test sequence, grading, weakness analysis এবং minimal DOM simulation-এ dashboard/exam/resume/result/retest/bank rendering পাস করেছে। Managed preview relay চালু হয়নি; বাস্তব browser visual, mobile layout, file-picker ও download flow সরাসরি যাচাই করা যায়নি। DOM simulation পূর্ণ browser test নয়।

## Design credit

Unslop design guidance by Damir Sokolovsky (https://heydamir.design/unslop), CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Adaptation: neutral surfaces, a single blue accent, consistent spacing and restrained typography. Original Unslop code is not bundled. No external services receive your test results. Google Fonts is used for typography; system fonts provide fallback.
