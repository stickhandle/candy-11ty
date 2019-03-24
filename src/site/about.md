---
title: About
headTitlePost: "| Candy"
date: 2019-03-17
layout: layouts/page.njk
metaDescription: "Candy is a quick-start scaffold for building sites. It's Eleventy with sugar on top!"
---

I'm Werner Siemens [<i class="fab fa-linkedin"></i>](https://www.linkedin.com/in/wernersiemens/). Dad, husband, developer and self-proclaimed beer expert. I put <span class="candy-logo">Candy</span> together as a learning experiment. I wanted to push out a few small websites but didn't want the hassle of managing servers ^[Something like a WordPress install on a VPS just felt too much like work.]. This led me to check out static site generators. I looked at a bunch of SSGs ^[I fooled around into Gatsby, Nextein, Lektor, Hugo, JBake, and Zola (né Gutenberg).] and settled on [Eleventy](https://www.11ty.io). It just made the most sense to me. YMMV.

I knew I wanted to have Bootstrap and JQuery available for my projects, so I figured I'd make a template heirarchy that included them. From there, I just kept adding more pieces that I wanted included by default. I leaned on the [Eleventy docs](https://www.11ty.io/docs/) and the starter projects by [Phil Hawksworth](https://github.com/philhawksworth/eleventyone) and [Zach Leatherman](https://github.com/11ty/eleventy-base-blog) to *learn by example* ^[Many, many thanks gentlemen. Appreciation sets in.], and <span class="candy-logo">Candy</span> was the result. Feel free to use it. Feel *even more free* to submit PRs to make it better.

## Build Something with <span class="candy-logo">Candy</span>

A quick read of the blog articles on this site would get you up and running in the same spirit of *learning by example* that I employed. I'd suggest the following order:
{% set cls = cycler("odd", "even") %}
{%- for post in collections.posts %}
<div class="blog-list-item {{ cls.next() }}">
    <div class="row">
        {% if post.data.mainImageFilename -%}
            {% if cls.current == 'odd' -%}
                {% include "blog-item-odd.njk" -%}
            {% else -%}
                {% include "blog-item-even.njk" -%}
            {% endif -%}
        {% else -%}
            {% include "blog-item-noimage.njk" -%}
        {% endif -%}
    </div>
</div>
{%- endfor %}

## Image Credits

All Candy images are from [Unsplash](https://unsplash.com). Credit to the following artists: [Sylvanus Urban](https://unsplash.com/@sylvanusurban), [Joanna Kosinska](https://unsplash.com/@joannakosinska), [rawpixel](https://unsplash.com/@rawpixel), [Patrick Fore](https://unsplash.com/@patrickian4) and [Analia Baggiano](https://unsplash.com/@anitabagg).
