import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PokeCollection from '@/components/PokeCollection'
import PokeCollectionFiltered from '@/components/PokeCollectionFiltered'
import PokeCollectionEditor from '@/components/PokeCollection-Editor'
import PokeStatCard from '@/components/PokeStatCard'
import PokeMoves from '@/components/PokeMoves'
import PokeMovesEditor from '@/components/PokeMoves-Editor'
import BraceletPowers from '@/components/BraceletPowers'
import BraceletPowersEditor from '@/components/BraceletPowers-Editor'
import BraceletCanHold from '@/components/BraceletCanHold'
import BraceletCanHoldEditor from '@/components/BraceletCanHold-Editor'
import WishList from '@/components/WishList'
import WishListEditor from '@/components/WishList-Editor'
import Login from '@/components/auth/login'
import Register from '@/components/auth/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/poke/:page',
      name: 'PokeCollection',
      component: PokeCollection
    },
    {
      path: '/pokefiltered/:query',
      name: 'PokeCollectionFiltered',
      component: PokeCollectionFiltered
    },
    {
      path: '/poke-editor/:key',
      name: 'PokeCollectionEditor',
      component: PokeCollectionEditor
    },
    {
      path: '/pokecard/:key',
      name: 'PokeStatCard',
      component: PokeStatCard
    },
    {
      path: '/poke-editor',
      name: 'PokeCollectionAdd',
      component: PokeCollectionEditor
    },
    {
      path: '/moves',
      name: 'PokeMoves',
      component: PokeMoves
    },
    {
      path: '/pokemoves-editor/:key',
      name: 'PokeMovesEditor',
      component: PokeMovesEditor
    },
    {
      path: '/braceletpowers',
      name: 'BraceletPowers',
      component: BraceletPowers
    },
    {
      path: '/braceletpowers-editor/:key',
      name: 'BraceletPowersEditor',
      component: BraceletPowersEditor
    },
    {
      path: '/braceletcanhold',
      name: 'BraceletCanHold',
      component: BraceletCanHold
    },
    {
      path: '/braceletcanhold-editor/:key',
      name: 'BraceletCanHoldEditor',
      component: BraceletCanHoldEditor
    },
    {
      path: '/wishlist',
      name: 'WishList',
      component: WishList
    },
    {
      path: '/wishlist-editor/:key',
      name: 'WishListEditor',
      component: WishListEditor
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
