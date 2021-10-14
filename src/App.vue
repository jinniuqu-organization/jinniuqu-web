<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: 'App'
	}
	// 处理空字符
	Vue.filter('nullFilter', function(value) {
		if (value == '我自定义的空') {
			return ''
		}
		return value == '' || value == undefined || value == null ? '\\' : value
	});

	// 标签页自定义空
  Vue.filter('lableNullFilter', function(value) {
    if (value == '我自定义的空') {
      return ''
    }
    return value == '' || value == undefined || value == null ? '-' : value
  });

	// 分割年和月日
	Vue.filter('dateFilter', function(date, type) {
		let arr = date.split("-")
		if (type == 1) {
			return arr[0]
		} else if (type == 2) {
			return arr[1] + '-' + arr[2]
		}
	})
</script>

<style>
	#app {
		width: 100%;
		height: 100%;
	}
</style>
