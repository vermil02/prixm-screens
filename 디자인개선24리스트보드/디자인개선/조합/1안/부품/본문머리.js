/* 조합 1안 · 부품/본문머리.js — 손질/06_경로줄 개편 랩 「사용자가 고른 조합 2」(2026-10-02 「이걸로 해 볼까?」 → 「ㅇㅇ 1안에 옮겨 주고」).
   1안반영.py 가 굽기_개편.py 값에서 그대로 뽑아 붙임 — 여기서 고쳐도 랩에는 안 돌아감. 정할 것은 랩으로. */
(function(){function 한번(){var on=getComputedStyle(document.documentElement).getPropertyValue('--lab-제목').trim()==='1';
var cur=document.querySelector('.page-hd .crumb .cur');var a=document.querySelector('.lnb-panel .channel-text-demo.active .ch-label');
var r=document.querySelector('.lab-새로고침')||document.querySelector('.head-zone .page-ttl .btn-ico');if(!cur)return;
if(on){if(!cur.dataset.lab)cur.dataset.lab=cur.textContent;if(a)cur.textContent=a.textContent.trim();
 if(r&&!r.classList.contains('lab-새로고침')){r.classList.add('lab-새로고침');r.__집=r.parentElement;cur.after(r);}
 var nm=document.querySelector('.bh-head .bh-name');if(nm&&!nm.dataset.lab){nm.dataset.lab=1;var at=cur;nm.querySelectorAll('.tpl-badge').forEach(function(b){b.classList.add('lab-옮긴꼬리표');b.__집=nm;at.after(b);at=b;});}}
else{if(cur.dataset.lab){cur.textContent=cur.dataset.lab;delete cur.dataset.lab;}
 if(r&&r.classList.contains('lab-새로고침')&&r.__집){r.__집.appendChild(r);r.classList.remove('lab-새로고침');}
 document.querySelectorAll('.lab-옮긴꼬리표').forEach(function(b){if(b.__집){b.__집.appendChild(b);delete b.__집.dataset.lab;}b.classList.remove('lab-옮긴꼬리표');});}}
한번();setTimeout(한번,300);setTimeout(한번,1200);})();
