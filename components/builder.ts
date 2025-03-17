import { ComponentBuilder } from '@sitecore-jss/sitecore-jss-nextjs'

import * as PartialDesignDynamicPlaceholder from './PartialDesignDynamicPlaceholder'

export const components = new Map()

import dynamic from 'next/dynamic'

components.set('PartialDesignDynamicPlaceholder', PartialDesignDynamicPlaceholder)
components.set('RichText', {
	Default: dynamic(() => import('./RichText/Default')),
})

export const componentBuilder = new ComponentBuilder({ components })

export const moduleFactory = componentBuilder.getModuleFactory()
