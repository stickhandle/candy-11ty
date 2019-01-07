---
layout: layouts/base.njk
pageClass: posts
templateEngineOverride: njk, md
---

<h1 class="title">{{ title }}</h1>
<div class="postline">
  <div class="tags">
    <i class="fas fa-tags"></i>
    {% for tag in tags -%}
      <div><a href="/tags/{{ tag }}" class="tag">#{{ tag }}</a></div>
    {% endfor -%}
  </div>
  <div class="postdate">
    <i class="fas fa-calendar-day"></i>
    <div>Last updated on {{ page.date | formatDisplayDate }}</div>
  </div>
</div>
<main>
  {{ content | safe }}
  <div class="footnote">
    <p>
      This page is part of the posts section.
    </p>
  </div>
</main>
