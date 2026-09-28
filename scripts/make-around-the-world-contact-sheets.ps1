Add-Type -AssemblyName System.Drawing

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$artRoot = Join-Path $projectRoot 'library\around-the-world-in-eighty-days\art\generated'
$outRoot = Join-Path $projectRoot '.tmp\around-the-world-contact-sheets'
New-Item -ItemType Directory -Force -Path $outRoot | Out-Null

function New-ContactSheet {
    param([string]$Source, [string]$Name, [int]$Columns = 4, [int]$Rows = 3)
    $files = @(Get-ChildItem -File -LiteralPath $Source -Filter '*.jpg' | Sort-Object Name)
    $perPage = $Columns * $Rows
    $cellWidth = 420
    $cellHeight = 310
    $labelHeight = 34
    $font = [System.Drawing.Font]::new('Arial', 13, [System.Drawing.FontStyle]::Bold)
    $brush = [System.Drawing.Brushes]::White
    for ($start = 0; $start -lt $files.Count; $start += $perPage) {
        $page = [int]($start / $perPage) + 1
        $canvas = [System.Drawing.Bitmap]::new($cellWidth * $Columns, ($cellHeight + $labelHeight) * $Rows)
        $graphics = [System.Drawing.Graphics]::FromImage($canvas)
        try {
            $graphics.Clear([System.Drawing.Color]::FromArgb(28, 30, 34))
            for ($offset = 0; $offset -lt $perPage -and ($start + $offset) -lt $files.Count; $offset++) {
                $file = $files[$start + $offset]
                $column = $offset % $Columns
                $row = [int]($offset / $Columns)
                $x = $column * $cellWidth
                $y = $row * ($cellHeight + $labelHeight)
                $image = [System.Drawing.Image]::FromFile($file.FullName)
                try {
                    $scale = [Math]::Min($cellWidth / $image.Width, $cellHeight / $image.Height)
                    $width = [int]($image.Width * $scale)
                    $height = [int]($image.Height * $scale)
                    $left = $x + [int](($cellWidth - $width) / 2)
                    $top = $y + [int](($cellHeight - $height) / 2)
                    $graphics.DrawImage($image, $left, $top, $width, $height)
                    $graphics.DrawString($file.BaseName, $font, $brush, $x + 8, $y + $cellHeight + 6)
                } finally { $image.Dispose() }
            }
            $target = Join-Path $outRoot ("{0}-{1}.jpg" -f $Name, $page)
            $canvas.Save($target, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            Write-Output $target
        } finally { $graphics.Dispose(); $canvas.Dispose() }
    }
    $font.Dispose()
}

New-ContactSheet -Source (Join-Path $artRoot 'characters') -Name 'characters'
New-ContactSheet -Source (Join-Path $artRoot 'items') -Name 'items'
New-ContactSheet -Source (Join-Path $artRoot 'locations') -Name 'locations'
