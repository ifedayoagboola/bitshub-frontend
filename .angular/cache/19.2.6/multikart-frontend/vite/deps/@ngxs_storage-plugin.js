import {
  InitState,
  StateToken,
  UpdateState,
  actionMatcher,
  getValue,
  setValue,
  withNgxsPlugin,
  ɵMETA_OPTIONS_KEY
} from "./chunk-7TWE7B3Z.js";
import "./chunk-V5XVF7GR.js";
import "./chunk-6YM3K4R6.js";
import {
  isPlatformBrowser,
  isPlatformServer
} from "./chunk-7TQJWVO5.js";
import {
  ENVIRONMENT_INITIALIZER,
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  PLATFORM_ID,
  inject,
  makeEnvironmentProviders,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-Y4YTYGY4.js";
import "./chunk-5KXDAEEK.js";
import "./chunk-VMI3K6GE.js";
import {
  tap
} from "./chunk-WD6C567C.js";
import "./chunk-HM5YLMWO.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-WDMUDEB6.js";

// node_modules/@ngxs/storage-plugin/fesm2022/ngxs-storage-plugin-internals.mjs
var ɵDEFAULT_STATE_KEY = "@@STATE";
var ɵUSER_OPTIONS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "USER_OPTIONS" : "");
var ɵALL_STATES_PERSISTED = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "ALL_STATES_PERSISTED" : "", {
  providedIn: "root",
  factory: () => inject(ɵUSER_OPTIONS).keys === "*"
});
var ɵNGXS_STORAGE_PLUGIN_OPTIONS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NGXS_STORAGE_PLUGIN_OPTIONS" : "");
var STORAGE_ENGINE = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "STORAGE_ENGINE" : "");
function ɵisKeyWithExplicitEngine(key) {
  return key != null && !!key.engine;
}
function ɵextractStringKey(storageKey) {
  if (ɵisKeyWithExplicitEngine(storageKey)) {
    storageKey = storageKey.key;
  }
  if (storageKey.hasOwnProperty(ɵMETA_OPTIONS_KEY)) {
    storageKey = storageKey[ɵMETA_OPTIONS_KEY].name;
  }
  return storageKey instanceof StateToken ? storageKey.getName() : storageKey;
}

// node_modules/@ngxs/storage-plugin/fesm2022/ngxs-storage-plugin.mjs
function storageOptionsFactory(options) {
  return __spreadProps(__spreadValues({
    storage: 0,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    beforeSerialize: (obj) => obj,
    afterDeserialize: (obj) => obj
  }, options), {
    keys: options.keys === "*" ? [ɵDEFAULT_STATE_KEY] : options.keys
  });
}
function engineFactory(options, platformId) {
  if (isPlatformServer(platformId)) {
    return null;
  }
  if (options.storage === 0) {
    return localStorage;
  } else if (options.storage === 1) {
    return sessionStorage;
  }
  return null;
}
function getStorageKey(key, options) {
  return options?.namespace ? `${options.namespace}:${key}` : key;
}
var ɵNgxsStoragePluginKeysManager = class _ɵNgxsStoragePluginKeysManager {
  constructor() {
    this._keys = /* @__PURE__ */ new Set();
    this._injector = inject(Injector);
    this._keysWithEngines = [];
    const {
      keys
    } = inject(ɵNGXS_STORAGE_PLUGIN_OPTIONS);
    this.addKeys(keys);
  }
  getKeysWithEngines() {
    return [...this._keysWithEngines];
  }
  addKeys(storageKeys) {
    for (const storageKey of storageKeys) {
      const key = ɵextractStringKey(storageKey);
      if (this._keys.has(key)) {
        continue;
      }
      this._keys.add(key);
      const engine = ɵisKeyWithExplicitEngine(storageKey) ? this._injector.get(storageKey.engine) : this._injector.get(STORAGE_ENGINE);
      this._keysWithEngines.push({
        key,
        engine
      });
    }
  }
  static {
    this.ɵfac = function ɵNgxsStoragePluginKeysManager_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ɵNgxsStoragePluginKeysManager)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ɵNgxsStoragePluginKeysManager,
      factory: _ɵNgxsStoragePluginKeysManager.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ɵNgxsStoragePluginKeysManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var NgxsStoragePlugin = class _NgxsStoragePlugin {
  constructor() {
    this._keysManager = inject(ɵNgxsStoragePluginKeysManager);
    this._options = inject(ɵNGXS_STORAGE_PLUGIN_OPTIONS);
    this._allStatesPersisted = inject(ɵALL_STATES_PERSISTED);
    this._isServer = isPlatformServer(inject(PLATFORM_ID));
  }
  handle(state, event, next) {
    if (this._isServer) {
      return next(state, event);
    }
    const matches = actionMatcher(event);
    const isInitAction = matches(InitState);
    const isUpdateAction = matches(UpdateState);
    const isInitOrUpdateAction = isInitAction || isUpdateAction;
    let hasMigration = false;
    if (isInitOrUpdateAction) {
      const addedStates = isUpdateAction && event.addedStates;
      for (const {
        key,
        engine
      } of this._keysManager.getKeysWithEngines()) {
        if (!this._allStatesPersisted && addedStates) {
          const dotNotationIndex = key.indexOf(DOT);
          const stateName = dotNotationIndex > -1 ? key.slice(0, dotNotationIndex) : key;
          if (!addedStates.hasOwnProperty(stateName)) {
            continue;
          }
        }
        const storageKey = getStorageKey(key, this._options);
        let storedValue = engine.getItem(storageKey);
        if (storedValue !== "undefined" && storedValue != null) {
          try {
            const newVal = this._options.deserialize(storedValue);
            storedValue = this._options.afterDeserialize(newVal, key);
          } catch {
            typeof ngDevMode !== "undefined" && ngDevMode && console.error(`Error ocurred while deserializing the ${storageKey} store value, falling back to empty object, the value obtained from the store: `, storedValue);
            storedValue = {};
          }
          this._options.migrations?.forEach((strategy) => {
            const versionMatch = strategy.version === getValue(storedValue, strategy.versionKey || "version");
            const keyMatch = !strategy.key && this._allStatesPersisted || strategy.key === key;
            if (versionMatch && keyMatch) {
              storedValue = strategy.migrate(storedValue);
              hasMigration = true;
            }
          });
          if (this._allStatesPersisted) {
            storedValue = this._hydrateSelectivelyOnUpdate(storedValue, addedStates);
            state = __spreadValues(__spreadValues({}, state), storedValue);
          } else {
            state = setValue(state, key, storedValue);
          }
        }
      }
    }
    return next(state, event).pipe(tap((nextState) => {
      if (isInitOrUpdateAction && !hasMigration) {
        return;
      }
      for (const {
        key,
        engine
      } of this._keysManager.getKeysWithEngines()) {
        let storedValue = nextState;
        const storageKey = getStorageKey(key, this._options);
        if (key !== ɵDEFAULT_STATE_KEY) {
          storedValue = getValue(nextState, key);
        }
        try {
          const newStoredValue = this._options.beforeSerialize(storedValue, key);
          engine.setItem(storageKey, this._options.serialize(newStoredValue));
        } catch (error) {
          if (typeof ngDevMode !== "undefined" && ngDevMode) {
            if (error && (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED")) {
              console.error(`The ${storageKey} store value exceeds the browser storage quota: `, storedValue);
            } else {
              console.error(`Error ocurred while serializing the ${storageKey} store value, value not updated, the value obtained from the store: `, storedValue);
            }
          }
        }
      }
    }));
  }
  _hydrateSelectivelyOnUpdate(storedValue, addedStates) {
    if (!storedValue || !addedStates || Object.keys(addedStates).length === 0) {
      return storedValue;
    }
    return Object.keys(addedStates).reduce((accumulator, addedState) => {
      if (storedValue.hasOwnProperty(addedState)) {
        accumulator[addedState] = storedValue[addedState];
      }
      return accumulator;
    }, {});
  }
  static {
    this.ɵfac = function NgxsStoragePlugin_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxsStoragePlugin)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _NgxsStoragePlugin,
      factory: _NgxsStoragePlugin.ɵfac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsStoragePlugin, [{
    type: Injectable
  }], null, null);
})();
var DOT = ".";
var NgxsStoragePluginModule = class _NgxsStoragePluginModule {
  static forRoot(options) {
    return {
      ngModule: _NgxsStoragePluginModule,
      providers: [withNgxsPlugin(NgxsStoragePlugin), {
        provide: ɵUSER_OPTIONS,
        useValue: options
      }, {
        provide: ɵNGXS_STORAGE_PLUGIN_OPTIONS,
        useFactory: storageOptionsFactory,
        deps: [ɵUSER_OPTIONS]
      }, {
        provide: STORAGE_ENGINE,
        useFactory: engineFactory,
        deps: [ɵNGXS_STORAGE_PLUGIN_OPTIONS, PLATFORM_ID]
      }]
    };
  }
  static {
    this.ɵfac = function NgxsStoragePluginModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxsStoragePluginModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxsStoragePluginModule
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsStoragePluginModule, [{
    type: NgModule
  }], null, null);
})();
function withNgxsStoragePlugin(options) {
  return makeEnvironmentProviders([withNgxsPlugin(NgxsStoragePlugin), {
    provide: ɵUSER_OPTIONS,
    useValue: options
  }, {
    provide: ɵNGXS_STORAGE_PLUGIN_OPTIONS,
    useFactory: storageOptionsFactory,
    deps: [ɵUSER_OPTIONS]
  }, {
    provide: STORAGE_ENGINE,
    useFactory: engineFactory,
    deps: [ɵNGXS_STORAGE_PLUGIN_OPTIONS, PLATFORM_ID]
  }]);
}
function withStorageFeature(storageKeys) {
  return makeEnvironmentProviders([{
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useValue: () => {
      const allStatesPersisted = inject(ɵALL_STATES_PERSISTED);
      if (allStatesPersisted) {
        if (typeof ngDevMode !== "undefined" && ngDevMode) {
          const message = "The NGXS storage plugin is currently persisting all states because the `keys` option was explicitly set to `*` at the root level. To selectively persist states, consider explicitly specifying them, allowing for addition at the feature level.";
          console.error(message);
        }
        return;
      }
      inject(ɵNgxsStoragePluginKeysManager).addKeys(storageKeys);
    }
  }]);
}
var LOCAL_STORAGE_ENGINE = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "LOCAL_STORAGE_ENGINE" : "", {
  providedIn: "root",
  factory: () => isPlatformBrowser(inject(PLATFORM_ID)) ? localStorage : null
});
var SESSION_STORAGE_ENGINE = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "SESSION_STORAGE_ENGINE" : "", {
  providedIn: "root",
  factory: () => isPlatformBrowser(inject(PLATFORM_ID)) ? sessionStorage : null
});
export {
  LOCAL_STORAGE_ENGINE,
  NgxsStoragePlugin,
  NgxsStoragePluginModule,
  SESSION_STORAGE_ENGINE,
  STORAGE_ENGINE,
  withNgxsStoragePlugin,
  withStorageFeature
};
//# sourceMappingURL=@ngxs_storage-plugin.js.map
