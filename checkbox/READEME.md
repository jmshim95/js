<div>
  <label><input type="checkbox" id="chkAll">All</label>
  <label><input type="checkbox" name="chk" data-seq="1">sub1</label>
  <label><input type="checkbox" name="chk" data-seq="2">sub2</label>
  <label><input type="checkbox" name="chk" data-seq="3">sub3</label>
  <label><input type="checkbox" name="chk" data-seq="4">sub4</label>
  <label><input type="checkbox" name="chk" data-seq="5">sub5</label>
  <br/>
  <br/>
  <br/>
  <hr/>

  <h1>개요</h1>
  <p>반복 노가다를 줄이고 일관성 있는 코드 작성을 위해 만들어 봤습니다</p>
  <p>개선사항이 있으면 편하게 피드백 주세요.</p>
  <p>감사합니다.</p>
  <p>만든이 <a href="mailto:jmshim95@gmail.com">jmshim95@gmail.com</a></p>
  <hr/>

  <h2>1. <code>initMainCheckbox()</code></h2>
  <p>메인 체크박스를 초기화합니다.</p>

  <h2>2. <code>initSubCheckboxes()</code></h2>
  <p>서브 체크박스들을 초기화합니다.</p>

  <h2>3. <code>getMainCheckbox()</code></h2>
  <p>메인 체크박스 DOM 요소를 반환합니다.</p>

  <h2>4. <code>getSubCheckboxes({checkedOnly = false, isRequired = true, isVisible = true})</code></h2>
  <p>서브 체크박스들을 반환합니다. <code>checkedOnly</code>는 체크된 것만 가져올지 여부를, <code>isRequired</code>는 필수 여부를, <code>isVisible</code>은 보이는 것만 가져올지 여부를 설정합니다.</p>

  <h2>5. <code>isAllChecked()</code></h2>
  <p>모든 체크박스가 체크되었는지 여부를 반환합니다.</p>

  <h2>6. <code>checkAll()</code></h2>
  <p>모든 체크박스를 체크합니다.</p>

  <h2>7. <code>uncheckAll()</code></h2>
  <p>모든 체크박스의 체크를 해제합니다.</p>

  <h2>8. <code>disableAll()</code></h2>
  <p>모든 체크박스를 비활성화합니다.</p>

  <h2>9. <code>enableAll()</code></h2>
  <p>모든 체크박스를 활성화합니다.</p>

  <h2>10. <code>getValues()</code></h2>
  <p>체크된 체크박스들의 값을 배열로 반환합니다.</p>
</div>
