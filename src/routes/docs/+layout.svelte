<script>
	import { Documentation, Nav } from '@fdnd/components';

	const data = {
		Stekje: {
			GET: '/docs/stekje',
			// POST: '/docs/method#post',
			// PUT: '/docs/method#put',
			// PATCH: '/docs/method#patch',
			// DELETE: '/docs/method#delete',
		},
		Stekjes: {
			GET: '/docs/stekjes#get',
			POST: '/docs/stekjes#post'
		},
		
	};
</script>

<Documentation {data}>
	<slot />
</Documentation>
