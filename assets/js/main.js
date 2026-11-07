/* ==========================================================================
   main.js — 공통 인터랙션
   - 스크롤 시 헤더 보더
   - 모바일 메뉴 토글 (접근성 속성 포함)
   - 현재 페이지 내비게이션 표시
   - 스크롤 진입 애니메이션
   - 푸터 연도 자동 갱신
   - 문의 폼 전송 상태 처리
   ========================================================================== */

(() => {
  "use strict";

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector("[data-header]");

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  /* ---------- Mobile navigation ---------- */
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const mobileQuery = window.matchMedia("(max-width: 860px)");

  const setNavState = (open) => {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    document.body.classList.toggle("nav-open", open && mobileQuery.matches);
  };

  const closeNav = (restoreFocus = false) => {
    if (!navToggle || navToggle.getAttribute("aria-expanded") !== "true") return;
    setNavState(false);
    if (restoreFocus) navToggle.focus();
  };

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      setNavState(navToggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNavState(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav(true);
    });

    const onBreakpointChange = () => {
      if (!mobileQuery.matches) setNavState(false);
    };

    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", onBreakpointChange);
    } else {
      window.addEventListener("resize", onBreakpointChange);
    }
  }

  /* ---------- Current page highlight ---------- */
  const path = window.location.pathname;
  const currentPage = path.substring(path.lastIndexOf("/") + 1) || "index.html";

  document.querySelectorAll("[data-nav] a").forEach((link) => {
    if (link.classList.contains("btn")) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("http")) return;

    const target = href.split("#")[0].split("/").pop();
    if (target && target === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* ---------- Current year ---------- */
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((item) => {
    item.textContent = year;
  });

  /* ---------- Contact form submit state ---------- */
  const contactForm = document.querySelector("[data-contact-form]");

  if (contactForm) {
    const submitButton = contactForm.querySelector('[type="submit"]');
    const submitLabel = submitButton ? submitButton.textContent : "";

    contactForm.addEventListener("submit", () => {
      if (!submitButton) return;
      submitButton.disabled = true;
      submitButton.textContent = "전송 중…";
    });

    // 브라우저 뒤로가기(bfcache)로 돌아왔을 때 버튼 상태 복구
    window.addEventListener("pageshow", () => {
      if (!submitButton) return;
      submitButton.disabled = false;
      submitButton.textContent = submitLabel;
    });
  }
})();
