
import { ComponentBuilder } from '@sitecore-jss/sitecore-jss-nextjs'

import * as PartialDesignDynamicPlaceholder from './PartialDesignDynamicPlaceholder'

export const components = new Map()

components.set('PartialDesignDynamicPlaceholder', PartialDesignDynamicPlaceholder)

export const componentBuilder = new ComponentBuilder({ components })

export const moduleFactory = componentBuilder.getModuleFactory()
