import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './shift.reducer';

export const Shift = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const shiftList = useAppSelector(state => state.shift.entities);
  const loading = useAppSelector(state => state.shift.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="shift-heading" data-cy="ShiftHeading">
        <Translate contentKey="rosterApplicationmonoApp.shift.home.title">Shifts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="rosterApplicationmonoApp.shift.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/shift/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="rosterApplicationmonoApp.shift.home.createLabel">Create new Shift</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {shiftList && shiftList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="rosterApplicationmonoApp.shift.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('key')}>
                  <Translate contentKey="rosterApplicationmonoApp.shift.key">Key</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('key')} />
                </th>
                <th className="hand" onClick={sort('shiftStart')}>
                  <Translate contentKey="rosterApplicationmonoApp.shift.shiftStart">Shift Start</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('shiftStart')} />
                </th>
                <th className="hand" onClick={sort('shiftEnd')}>
                  <Translate contentKey="rosterApplicationmonoApp.shift.shiftEnd">Shift End</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('shiftEnd')} />
                </th>
                <th className="hand" onClick={sort('type')}>
                  <Translate contentKey="rosterApplicationmonoApp.shift.type">Type</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('type')} />
                </th>
                <th>
                  <Translate contentKey="rosterApplicationmonoApp.shift.teamPlan">Team Plan</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="rosterApplicationmonoApp.shift.shiftDemand">Shift Demand</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="rosterApplicationmonoApp.shift.resourcePlan">Resource Plan</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {shiftList.map((shift, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/shift/${shift.id}`} color="link" size="sm">
                      {shift.id}
                    </Button>
                  </td>
                  <td>{shift.key}</td>
                  <td>{shift.shiftStart ? <TextFormat type="date" value={shift.shiftStart} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{shift.shiftEnd ? <TextFormat type="date" value={shift.shiftEnd} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{shift.type}</td>
                  <td>{shift.teamPlan ? <Link to={`/team-plan/${shift.teamPlan.id}`}>{shift.teamPlan.id}</Link> : ''}</td>
                  <td>{shift.shiftDemand ? <Link to={`/shift-demand/${shift.shiftDemand.id}`}>{shift.shiftDemand.id}</Link> : ''}</td>
                  <td>{shift.resourcePlan ? <Link to={`/resource-plan/${shift.resourcePlan.id}`}>{shift.resourcePlan.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/shift/${shift.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/shift/${shift.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/shift/${shift.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="rosterApplicationmonoApp.shift.home.notFound">No Shifts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Shift;
