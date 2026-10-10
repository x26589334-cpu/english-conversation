/* ===========================================================
   신청 폼 → 구글 시트 연결 (나도 영어회화 · 1:1 전화·화상 영어회화)
   -----------------------------------------------------------
   과외·인천과외·키즈튜터·채용 등과 같은 **허브 웹앱 하나**로 보냅니다.
   → 구글 "웹 문의" 시트(ID 1UUS6le8…)의 **"영어회화" 탭**에 저장
     (폼이 sheet=영어회화 를 함께 보내고, 스크립트가 그 탭을 찾거나 자동 생성)
   ⚠️ 허브 배포본에는 허용 탭 목록이 없어서 여기 값이 그대로 탭 이름이 됩니다.
     오타 나면 기본 탭으로 안 가고 새 탭이 조용히 생김. 탭 이름 변경은 사용자 확인 후.
     실제 스크립트는 구글 서버에 있음(사이트관리/도구/허브_통합.gs 가 참고 사본).
   =========================================================== */

const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbznAb0ZOODlNp-ckR5fvkqtVQijwuJ9Gl0G4KxDrfp-K7zM4fcfMMp5qDhAbwNkvYQG/exec";

function _val(id){ const el = document.getElementById(id); return el ? String(el.value).trim() : ""; }

function _sendToSheet(payload){
  return fetch(SHEET_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: new URLSearchParams(payload).toString()
  });
}

(function(){
  const form = document.getElementById("applyForm");
  if(!form) return;
  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    for(const id of ["name","phone","target"]){
      if(!_val(id)){ alert("이름·연락처·수업 대상은 꼭 적어 주세요."); const el=document.getElementById(id); if(el) el.focus(); return; }
    }
    if(!document.getElementById("agree").checked){ alert("개인정보 수집에 동의해 주셔야 상담 연락을 드릴 수 있어요."); return; }

    const payload = {
      sheet: "영어회화",
      _form: "영어회화-무료레벨테스트신청",
      _page: location.pathname,
      _time: new Date().toLocaleString("ko-KR"),
      이름: _val("name"), 연락처: _val("phone"), 수업대상: _val("target"),
      희망수업: _val("mode"), 현재레벨: _val("level"), 연락시간: _val("time"), 남길말: _val("memo")
    };

    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.disabled = true; btn.textContent = "접수 중…";
    try{ await _sendToSheet(payload); }catch(_){ /* no-cors: 응답 못 읽어도 정상 */ }
    document.getElementById("okMsg").style.display = "block";
    btn.textContent = "신청 완료 ✓";
    form.querySelectorAll("input:not([type=checkbox]),select,textarea").forEach(el => el.value = "");
    setTimeout(()=>{ btn.disabled = false; btn.textContent = orig; }, 8000);
  });
})();
