<template>
	<view class="content">
        <image class="logo" src="../../static/logo.png"></image>
		<view>
            <text class="title">{{token}}</text>
        </view>
	</view>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
import BaseMixin from '@/mixins/BaseMixin'
@Component
export default class Index extends Mixins(BaseMixin) {
  @Getter('token') private token: any
  @Mutation('SET_TOKEN') private mSetToken: any
  private title = 'title'
  public onLoad() {
    this.mSetToken('Hello')
    this.$api.user.getUserInfo().then((res: any) => {
      console.log('loginDesc', res)
    })
  }
}
</script>

<style>
.content {
  text-align: center;
  height: 400upx;
}
.logo{
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}
.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>
