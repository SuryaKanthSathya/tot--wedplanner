export interface RouteState {
  screen: 'landing' | 'create-account' | 'verify-otp' | 'dashboard' | 'tell-us-about-couple';
  tab?: 'home' | 'my-wedding' | 'quotes' | 'profile';
  subpage?:
    | 'cars'
    | 'photography'
    | 'makeup'
    | 'decor'
    | 'venues'
    | 'entertainment'
    | 'invitation'
    | 'catering'
    | 'mehendi'
    | 'rituals'
    | 'destinations'
    | 'find-vendors'
    | 'collection'
    | null;
  detailId?: string | null;
}

const STORAGE_KEY = 'tot_active_route';

export const parseHashRoute = (): Partial<RouteState> | null => {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash || '';
  if (!hash || hash === '#' || hash === '#/') return null;

  const cleanHash = hash.replace(/^#\/?/, '');
  const [pathPart, queryPart] = cleanHash.split('?');
  const path = pathPart.toLowerCase().trim();

  const queryParams = new URLSearchParams(queryPart || '');
  const detailId = queryParams.get('id') || null;

  if (path === 'landing') {
    return { screen: 'landing', tab: 'home', subpage: null, detailId: null };
  }
  if (path === 'create-account') {
    return { screen: 'create-account' };
  }
  if (path === 'verify-otp') {
    return { screen: 'verify-otp' };
  }
  if (path === 'tell-us-about-couple') {
    return { screen: 'tell-us-about-couple' };
  }

  // Dashboard Tabs
  if (path === 'home' || path === 'dashboard') {
    return { screen: 'dashboard', tab: 'home', subpage: null, detailId: null };
  }
  if (path === 'my-wedding') {
    return { screen: 'dashboard', tab: 'my-wedding', subpage: null, detailId: null };
  }
  if (path === 'quotes') {
    return { screen: 'dashboard', tab: 'quotes', subpage: null, detailId: null };
  }
  if (path === 'profile') {
    return { screen: 'dashboard', tab: 'profile', subpage: null, detailId: null };
  }

  // Listing / Flow Subpages
  const validSubpages: RouteState['subpage'][] = [
    'cars',
    'photography',
    'makeup',
    'decor',
    'venues',
    'entertainment',
    'invitation',
    'catering',
    'mehendi',
    'rituals',
    'destinations',
    'find-vendors',
    'collection',
  ];

  const matchedSubpage = validSubpages.find(
    (sp) =>
      sp === path ||
      path.startsWith(sp + '/') ||
      (sp === 'venues' && (path === 'venue' || path === 'mandapam')) ||
      (sp === 'collection' && path === 'collections')
  );

  if (matchedSubpage) {
    let finalDetailId = detailId;
    if (!finalDetailId && path.includes('/')) {
      finalDetailId = path.split('/')[1] || null;
    }
    return {
      screen: 'dashboard',
      tab: 'home',
      subpage: matchedSubpage,
      detailId: finalDetailId,
    };
  }

  return null;
};

export const getInitialRoute = (): RouteState => {
  if (typeof window === 'undefined') {
    return { screen: 'landing', tab: 'home', subpage: null, detailId: null };
  }

  // 1. Try URL hash first
  const hashRoute = parseHashRoute();
  if (hashRoute && hashRoute.screen) {
    return {
      screen: hashRoute.screen,
      tab: hashRoute.tab || 'home',
      subpage: hashRoute.subpage || null,
      detailId: hashRoute.detailId || null,
    };
  }

  // 2. Try localStorage fallback
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: RouteState = JSON.parse(saved);
      if (parsed && parsed.screen) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading saved route from storage:', e);
  }

  // 3. Default
  return { screen: 'landing', tab: 'home', subpage: null, detailId: null };
};

export const setAppRoute = (route: Partial<RouteState>) => {
  if (typeof window === 'undefined') return;

  const current = getInitialRoute();
  const nextRoute: RouteState = {
    screen: route.screen || current.screen || 'dashboard',
    tab: route.tab !== undefined ? route.tab : current.tab || 'home',
    subpage: route.subpage !== undefined ? route.subpage : null,
    detailId: route.detailId !== undefined ? route.detailId : null,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRoute));
  } catch (e) {
    console.error('Error saving route:', e);
  }

  // Build URL hash
  let newHash = '#/';
  if (nextRoute.screen === 'landing') {
    newHash = '#/landing';
  } else if (nextRoute.screen === 'create-account') {
    newHash = '#/create-account';
  } else if (nextRoute.screen === 'verify-otp') {
    newHash = '#/verify-otp';
  } else if (nextRoute.screen === 'tell-us-about-couple') {
    newHash = '#/tell-us-about-couple';
  } else if (nextRoute.subpage) {
    newHash = `#/${nextRoute.subpage}${nextRoute.detailId ? `?id=${nextRoute.detailId}` : ''}`;
  } else if (nextRoute.tab && nextRoute.tab !== 'home') {
    newHash = `#/${nextRoute.tab}`;
  } else {
    newHash = '#/home';
  }

  if (window.location.hash !== newHash) {
    window.history.replaceState(null, '', newHash);
  }

  // Dispatch event for components that listen to route changes
  window.dispatchEvent(new CustomEvent('tot_route_changed', { detail: nextRoute }));
};

export const clearAppRoute = () => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.history.replaceState(null, '', '#/landing');
  } catch (e) {
    console.error('Error clearing route:', e);
  }
};
