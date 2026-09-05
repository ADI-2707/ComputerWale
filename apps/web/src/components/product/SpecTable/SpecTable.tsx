import styles from './SpecTable.module.css'
import type { ProductSpecs } from '../../../types'

interface SpecTableProps {
  specs: ProductSpecs
  warrantyMonths: number
  warrantyIncludes: string[]
  batteryHealth?: number
}

const SPEC_LABELS: Record<keyof ProductSpecs, string> = {
  cpu: 'Processor',
  ram: 'RAM',
  storage: 'Storage',
  display: 'Display',
  gpu: 'Graphics',
  os: 'Operating System',
  weight: 'Weight',
  batteryCapacity: 'Battery',
}

export function SpecTable({ specs, warrantyMonths, warrantyIncludes, batteryHealth }: SpecTableProps) {
  const rows = (Object.entries(specs) as [keyof ProductSpecs, string][])
    .filter(([, v]) => Boolean(v))

  return (
    <div className={styles.wrapper}>
      <table className={styles.table} aria-label="Product specifications">
        <tbody>
          {rows.map(([key, value]) => (
            <tr key={key} className={styles.row}>
              <th scope="row" className={styles.label}>{SPEC_LABELS[key]}</th>
              <td className={styles.value}>{value}</td>
            </tr>
          ))}
          {batteryHealth !== undefined && (
            <tr className={styles.row}>
              <th scope="row" className={styles.label}>Battery health</th>
              <td className={styles.value}>
                <span className={batteryHealth >= 80 ? styles.healthGood : batteryHealth >= 65 ? styles.healthOk : styles.healthLow}>
                  {batteryHealth}%
                </span>
              </td>
            </tr>
          )}
          <tr className={styles.row}>
            <th scope="row" className={styles.label}>Warranty</th>
            <td className={styles.value}>
              {warrantyMonths} month{warrantyMonths !== 1 ? 's' : ''} — {warrantyIncludes.join(' · ')}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
