<template>
  <div class="out">
    <div class="center">
      <div>

      </div>
      <div>
        返回上一页
      </div>
    </div>
    <div class="t1">
      <div class="boxIn1"></div>
    </div>
    <div class="t2">
      <div class="boxIn2"></div>
    </div>
    <div class="t7">
      <div class="boxIn7"></div>
    </div>
    <div class="t8">
      <div class="boxIn8"></div>
    </div>
    <div class="t9">
      <div class="boxIn9"></div>
    </div>
    <div class="t10">
      <div class="boxIn10"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Error404"
  }
</script>

<style scoped>
  .out {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/error/332b2ea40ffe7bb0dcc5df70328ff5b.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    overflow-x: hidden;
  }

  .out > div {
    position: absolute;
    width: 100%;
    height: 1px;
  }

  .out > div div {
    padding-top: 2px;
    filter: drop-shadow(2px 2px 3px rgba(150, 150, 150, 0.6));
    position: absolute;
    width: 150px;
    height: 160px;
    background-image: url("../../assets/error/829f9981cd7621fe97064fa20f9dc02.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% auto;
    margin-left: -200px;
  }

  .t1 {
    top: 0;
  }

  .boxIn1 {
    animation: cloud1 15s linear 0s infinite normal;
  }

  .t2 {
    top: 30px;
  }

  .boxIn2 {
    animation: cloud1 18s linear -12s infinite normal;
    background-image: url("../../assets/error/f7bc003f1f8884fc2b414dcb161458a.png") !important;
    opacity: 0.6;
  }

  .t7 {
    opacity: 0.5;
    top: 130px;
  }

  .boxIn7 {
    animation: cloud1 16s linear -8s infinite normal;
  }

  .t8 {
    bottom: 250px;
  }

  .boxIn8 {
    animation: cloud1 19s linear -15s infinite normal;
    background-image: url("../../assets/error/f7bc003f1f8884fc2b414dcb161458a.png") !important;
  }

  .t9 {
    bottom: 200px;
    opacity: 0.7;
  }

  .boxIn9 {
    animation: cloud1 13s linear -0.5s infinite normal;
    background-image: url("../../assets/error/f7bc003f1f8884fc2b414dcb161458a.png") !important;
  }

  .t10 {
    bottom: 200px;
    opacity: 0.85;
  }

  .boxIn10 {
    animation: cloud1 16s linear -8s infinite normal;
    background-image: url("../../assets/error/f7bc003f1f8884fc2b414dcb161458a.png") !important;
  }

  @keyframes cloud1 {
    from {
      margin-left: -10%;
    }
    to {
      margin-left: 100%;
    }
  }
</style>
