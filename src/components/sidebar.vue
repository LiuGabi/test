<style lang="less">
	.sidebar{
		float:left;
		width:200px;
		background:#000;
	}
</style>
<template>
	<div class='sidebar'>
		<div class='switch' v-on:click='sliderSidebar'>
			<i class='icon icon-switch'></i>
		</div>

		<el-menu default-active="1-1"  theme="dark">

			<el-submenu index="1">
				<template slot="title">产品配置</template>
				<el-menu-item index="1-1">
					<router-link to="/banner">
						banner配置
					</router-link>
				</el-menu-item>
				<el-menu-item index="1-2">
					<router-link to="/notic">
						公告配置
					</router-link>
				</el-menu-item>
			</el-submenu>

			<el-submenu index="2">
				<template slot="title">用户中心</template>
				<el-menu-item index="1-1">
                    <router-link to="/userManagement">
                        用户管理
                    </router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                    <router-link to="/userApproval">
                        用户审批
                    </router-link>
                </el-menu-item>
                <el-menu-item index="1-3">
                    <router-link to="/roleManagement">
                        角色管理
                    </router-link>
                </el-menu-item>
			</el-submenu>

			<el-submenu index="3">
				<template slot="title">系统管理</template>
			</el-submenu>

		</el-menu>

	</div>
</template>

<script>
    export default {
		methods: {
			sliderSidebar() {
				this.$emit('sliderSidebar');
			}
		}
    }
 </script>