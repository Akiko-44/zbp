<template>
	<div class="box">
		<h1>运费计算规则说明</h1>
		<p>下单时，若订单总金额符合满包邮，则订单运费为0；若没有设置满包邮或订单金额不符合满包邮条件，则开始计算不包邮商品的邮费。</p>
		<div class="one">
			<h2>1、所有商品绑定同一个件数模板</h2>
			<p>运费=首费+续费，运费保留两位小数，例如：</p>
			<table class="imagetable" border="1">
				<tr>
					<td>商品</td>
					<td>用户设置的首件规则</td>
					<td>首件收费</td>
					<td>每增加</td>
					<td>增加运费</td>
					<td>实际购买</td>
				</tr>
				<tr>
					<td>商品</td>
					<td>5件内10元</td>
					<td>10元</td>
					<td>1件</td>
					<td>5元</td>
					<td>6件</td>
				</tr>
				<tr class="hb">
					<td colspan="6">首件运费：10元</td>
				</tr>
				<tr class="hb">
					<td colspan="6">续件：6-5=1件</td>
				</tr>
				<tr class="hb">
					<td colspan="6">续件运费：5*1=5元</td>
				</tr>
				<tr class="hb">
					<td colspan="6">总运费：10+5=15元</td>
				</tr>
			</table>
		</div>
		<div class="one">
			<h2>2、所有商品绑定了同一个重量模板</h2>
			<p>运运费=首费+续费，运费保留两位小数</p>
			<p>计算续费时按照"每增加kg数"向上取整，例如:</p>
			<table class="imagetable" border="1">
				<tr>
					<td>商品</td>
					<td>用户设置的首重规则</td>
					<td>首重收费</td>
					<td>每增加</td>
					<td>增加运费</td>
					<td>实际购买</td>
				</tr>
				<tr>
					<td>商品</td>
					<td>0.5kg内2.3元</td>
					<td>2.3元</td>
					<td>0.1kg</td>
					<td>0.12元</td>
					<td>1.55kg</td>
				</tr>
				<tr class="hb">
					<td colspan="6">首重运费：2.3元</td>
				</tr>
				<tr class="hb">
					<td colspan="6">续重：1.55-0.5=1.05kg，按照每增加kg数向上进位，取1.1kg；</td>
				</tr>
				<tr class="hb">
					<td colspan="6">续重运费：1.1/0,1*0.12=1.32元</td>
				</tr>
				<tr class="hb">
					<td colspan="6">总运费：2.3+1.32=3.62元</td>
				</tr>
			</table>
		</div>
		<div class="one">
			<h2>3、所有商品绑定了多个件数模板</h2>
			<p>运费=【最大首费，最小续费商品】的首费+其余商品的续费，运费向上取整保留整数，例如：</p>
			<table class="imagetable" border="1">
				<tr>
					<td>商品</td>
					<td>用户设置的首件规则</td>
					<td>首件收费</td>
					<td>每增加</td>
					<td>增加运费</td>
					<td>实际购买</td>
				</tr>
				<tr>
					<td>商品A</td>
					<td>2件内5元</td>
					<td>15元</td>
					<td>1件</td>
					<td>1元</td>
					<td>5件</td>
				</tr>
				<tr>
					<td>商品B</td>
					<td>1件内10元</td>
					<td>10元</td>
					<td>2件</td>
					<td>2元</td>
					<td>2件</td>
				</tr>
				<tr>
					<td>商品C</td>
					<td>3件内10元</td>
					<td>10元</td>
					<td>2件</td>
					<td>1元</td>
					<td>4件</td>
				</tr>
				<tr>
					<td>商品D</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr class="hb">
					<td colspan="6">首重和续重的取值只看钱数，不看件数</td>
				</tr>
				<tr class="hb">
					<td colspan="6">计算：最大首费、最小续费商品C，故首费=10元，续费的商品计算顺序为：C、B、A，其中C的续费=（4-3）*（1/2）=0.5元，B的续费=2*（2/2）=2，A的续费=5*（1/1）=5，总的运费=10+0.5+2+5=17.5=18元（只入不舍）</td>
				</tr>
			</table>
		</div>
		<div class="one">
			<h2>4、所有商品绑定了多个重量模板</h2>
			<p>运费=【最大首费，最小续费商品】的首费+其余商品的续费，运费向上取整保留整数，例如：</p>
			<table class="imagetable" border="1">
				<tr>
					<td>商品</td>
					<td>用户设置的首重规则</td>
					<td>首重收费</td>
					<td>每增加</td>
					<td>增加运费</td>
					<td>实际购买</td>
				</tr>
				<tr>
					<td>商品A</td>
					<td>2kg内5元</td>
					<td>5元</td>
					<td>1kg</td>
					<td>1元</td>
					<td>4.1kg</td>
				</tr>
				<tr>
					<td>商品B</td>
					<td>1kg内10元</td>
					<td>10元</td>
					<td>2kg</td>
					<td>2元</td>
					<td>1.9kg</td>
				</tr>
				<tr>
					<td>商品C</td>
					<td>3kg内10元</td>
					<td>10元</td>
					<td>2kg</td>
					<td>1元</td>
					<td>3.5kg</td>
				</tr>
				<tr>
					<td>商品</td>
					<td>单件包邮</td>
					<td></td>
					<td></td>
					<td></td>
					<td>2kg</td>
				</tr>
				<tr class="hb">
					<td colspan="6">首重和续重的取值只看钱数，不看件数</td>
				</tr>
				<tr class="hb">
					<td colspan="6">首重和续重的取值只看钱数，不看kg数</td>
				</tr>
				<tr class="hb">
					<td colspan="6">计算：最大首费、最小续费商品C，故首费=10元，续费的商品计算顺序为：C、B、A，</td>
				</tr>
				<tr class="hb">
					<td colspan="6">C续重计算：（3.5-3）=0.5kg，根据续重每增加2kg取整，故续重取2kg，续费1元</td>
				</tr>
				<tr class="hb">
					<td colspan="6">B续重计算：1.9kg根据续重每增加2kg取整，故续重取2kg，续费2元</td>
				</tr>
				<tr class="hb">
					<td colspan="6">A续重计算：4.1kg根据续重每增加2kg取整，故续重取5kg，续费5元</td>
				</tr>
				<tr class="hb">
					<td colspan="6">故总运费：10+1+2+5=18元</td>
				</tr>
			</table>
		</div>
		<div class="one">
			<h2>5、所有商品绑定了重量模板和件数模板</h2>
			<p>件数模板商品单独计算，重量模板商品单独计算，运费保留整数</p>
		</div>
	</div>
</template>

<style type="text/css">
.box{
			width: 888px;
			height: auto;
			margin: 0 auto;
		}
		h1{
			text-align: center;
		}
		.imagetable{
			border-collapse:collapse;
			width:900px;
			text-align: center;
		}
		.imagetable tr{
			height: 40px;
		}
		.hb{
			text-align: left;
			border-color: #fff;
		}
</style>