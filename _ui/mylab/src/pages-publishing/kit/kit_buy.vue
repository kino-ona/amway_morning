<template>
  <div class="kit-buy">
    <form>
      <fieldset>
        <legend>키트 구매목록</legend>
        <h2 class="h2-title">키트 구매목록</h2>
        <div class="title-area">
          <p>
            주문하신 키트가 발송된 이후 키트 구매목록에서 해당 주문번호를 확인하실 수 있으며, 이미 등록한 키트의
            경우에는 주문번호를 확인하실 수 없습니다.
          </p>
        </div>
        <div class="tbl">
          <table>
            <caption>
              키트 구매목록 상세
            </caption>
            <colgroup>
              <col style="width: 10%" />
              <col style="width: 19%" />
              <col style="width: 21%" />
              <col style="width: 36%" />
              <col style="width: 14%" />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">NO</th>
                <th scope="col">사용여부</th>
                <th scope="col">주문일자</th>
                <th scope="col">주문번호</th>
                <th scope="col">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>8</td>
                <td>사용</td>
                <td>22.01.03</td>
                <td><p>180-814849056</p></td>
                <td></td>
              </tr>
              <tr>
                <td>7</td>
                <td class="color-red">미사용</td>
                <td>21.12.12</td>
                <td>
                  <!-- 2022-03-31 주문번호 p태그 추가, sop 뱃지 추가 -->
                  <p>
                    <em class="sop"><span>SOP</span></em> 180-814849056
                  </p>
                </td>
                <td><button type="buton" class="btn">복사</button></td>
              </tr>
              <tr>
                <td>6</td>
                <td class="color-red">미사용</td>
                <td>21.10.19</td>
                <td><p>180-814849056</p></td>
                <td><button type="buton" class="btn">복사</button></td>
              </tr>
              <tr>
                <td>5</td>
                <td>사용</td>
                <td>21.10.02</td>
                <td><p>180-814849056</p></td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td>사용</td>
                <td>21.05.06</td>
                <td><p>180-814849056</p></td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td>사용</td>
                <td>21.02.08</td>
                <td><p>180-814849056</p></td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td>사용</td>
                <td>19.12.05</td>
                <td><p>180-814849056</p></td>
                <td></td>
              </tr>
              <tr>
                <td>1</td>
                <td>사용</td>
                <td>19.11.02</td>
                <td><p>180-814849056</p></td>
                <td></td>
              </tr>
              <tr>
                <!-- 2022-03-11 nodata 케이스 추가 -->
                <td colspan="5" class="nodata">구매내역이 없습니다.</td>
              </tr>
            </tbody>
          </table>
          <button type="button" class="btn-more"><span class="hide">더보기</span></button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Kitbuy',
  data: function () {
    return {}
  },
  mounted() {
    // page start
    sessionStorage.clear()
  },
  methods: {},
}
</script>
