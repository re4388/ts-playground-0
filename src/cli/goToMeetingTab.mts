import { getTabs } from './util/getTabs.mjs'
import { focusTab } from './util/focusTab.mjs'


let currentActiveTabs = await getTabs()
const pattern = /Meet -/;
const matchedTabs = currentActiveTabs.filter((tab: { title: string; }) => pattern.test(tab.title));
if (matchedTabs.length > 0) {
  await focusTab(matchedTabs[0].url);
} {
  console.log('no matching tabs found')
}
