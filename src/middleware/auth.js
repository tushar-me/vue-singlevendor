import { useAuthStore } from '@/stores/useAuthStore.js'

export default (to, from, next) => {
	const auth = useAuthStore()

	let exceptionalRoutes = ['login', 'register', 'forgot-password']
	let isGoingExceptionalRoutes = exceptionalRoutes.includes(to.name)

	let authProcted = ['dashboard', 'customer.order', 'payment', 'checkout']
	let isAuthProcted = authProcted.includes(to.name)
	if (!auth.isLoggedIn && isAuthProcted) {
		
	// 	// if (isGoingExceptionalRoutes) {
	// 	// 	next()
	// 	// 	return
	// 	// } else {
	// 	// 	next({ name: 'login' })
	// 	// 	return
	// 	// } 
		
		next({ name: 'login' })
		return
	}else if (auth.isLoggedIn && isGoingExceptionalRoutes) {
		next({ name: 'dashboard', query: { 'redirect-reason': 'already logged' } })
	} else {
		next()
	}
}
