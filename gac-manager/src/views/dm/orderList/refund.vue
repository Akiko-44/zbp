 <template>
  <RefundList :getPage="refundPage" detailRouteName="aftermarketDetail" />
</template>

<script>
import RefundList from '@/components/app/orderRefund/refundList'
import { refundPage } from '@/api/common/order'

export default {
	components: {
	  RefundList
	},
	methods: {
	  refundPage
	}
}
</script>
