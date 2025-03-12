import { ComponentBuilder } from '@sitecore-jss/sitecore-jss-nextjs'

import * as PartialDesignDynamicPlaceholder from './PartialDesignDynamicPlaceholder'
import * as RichText from './RichText'

export const components = new Map()

components.set('PartialDesignDynamicPlaceholder', PartialDesignDynamicPlaceholder)
components.set('RichText', RichText)

export const componentBuilder = new ComponentBuilder({ components })

export const moduleFactory = componentBuilder.getModuleFactory()
