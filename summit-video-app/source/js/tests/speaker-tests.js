import expect from 'expect';
import {speakers as reducer} from '../reducers/speakers';
import * as Actions from '../actions';
import speakerData from './fixtures/speakers';
import mockAPI from './mocks/mockAPI';
import mockStore from './mocks/mockStore';

Actions.setHTTPClient(mockAPI);

describe('Speaker tests', () => {
	const initialState = reducer(undefined);
	it('adds a loading state when speakers are requested', () => {
		const result = reducer(initialState, Actions.requestSpeakers())

		expect(result).toEqual({
			...initialState,
			loading: true
		});

	});

	it('will not deflate the speaker state', () => {
		const result = reducer(initialState, Actions.requestSpeakers());

		expect(result).toEqual({
			...initialState,
			loading: true
		})
	});

	it('adds speakers from a server response', () => {
		const result = reducer(initialState, Actions.receiveSpeakers({
			response: speakerData
		}));

		expect(result).toEqual({
			...speakerData,
			loading: false
		});
	});

	it('fetches speakers asyncrhonously', (done) => {
		const expectedActions = [
			Actions.requestSpeakers(),
			Actions.receiveSpeakers({
				response: speakerData
			})
		];
				
		const store = mockStore(initialState);
		store.dispatch(Actions.fetchSpeakers());
		setTimeout(() => {
			expect(store.getActions()).toEqual(expectedActions);
			done();
		}, 0);
	})

});